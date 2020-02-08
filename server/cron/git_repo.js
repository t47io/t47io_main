import axios from 'axios';
import colors from 'colors';
import Github from 'github-api';

import { GITHUB } from '../config.js';
import { writeJsonFile } from '../util.js';
import { REPOSITORY_LIST } from '../../applications/project/constants/repositoryTypes.js';
import { delayFor } from '../../applications/common/util.js';
import logger from '../logger.js';

import serverJSON from '../../config/server.json';

const { git: { token, login } } = serverJSON;
const log = logger('cron:repo');


const getContribOnce = async (repo, repoName) => {
  const json = await repo.getContributorStats();
  // github may respond 202 while it executes query
  if (json.status === 200) { return json; }

  log.debug(`Fetching Github records for repository ${colors.blue(repoName)} returned ${colors.red(json.status)}, retrying...`);
  throw new Error('Failed to fetch Github repository contrib');
};
const getContribRetry = async (repo, repoName, retry, interval) => {
  let retries = retry;
  let delay = interval;
  while (retries > 0) {
    try {
      // eslint-disable-next-line
      return await getContribOnce(repo, repoName);
    } catch (err) {
      retries -= 1;
      delay *= 2;
      // eslint-disable-next-line
      await delayFor(delay);
    }
  }
  throw new Error('retry maxed out.');
};

const trimZeroContribs = (months, aggregatedData) => {
  let beginIdx = 0;
  let endIdx = months.length;
  while (beginIdx < endIdx) {
    const monthData = aggregatedData[months[beginIdx]];
    if (monthData.additions === 0 && monthData.deletions === 0) {
      beginIdx += 1;
    } else {
      break;
    }
  }
  while (beginIdx < endIdx) {
    const monthData = aggregatedData[months[endIdx - 1]];
    if (monthData.additions === 0 && monthData.deletions === 0) {
      endIdx -= 1;
    } else {
      break;
    }
  }
  return months.slice(beginIdx, endIdx);
};

const formatDateTime = utc => (utc.replace('T', ' ').replace('Z', ''));
const formatWeekMonth = week => (
  new Date(week * 1000).toLocaleString('en-us', {
    month: 'numeric',
    year: 'numeric',
  })
);
const formatBasics = (basics, pulls, branches, downloads) => ({
  name: basics.full_name,
  isPrivate: basics.private,
  createdAt: formatDateTime(basics.created_at),
  pushedAt: formatDateTime(basics.pushed_at),
  issues: basics.open_issues_count,
  downloads: downloads.length,
  forks: basics.forks_count,
  pulls: pulls.length,
  branches: branches.length,
  stars: basics.stargazers_count,
  watchers: basics.watchers_count,
});
const formatTable = (data) => {
  const combinedResult = data.map(contrib => ({
    author: contrib.author ? contrib.author.login : GITHUB.DEFUALT_AUTHOR,
    commits: contrib.total,
    ...(
      contrib.weeks.reduce((sum, week) => ({
        additions: sum.additions + week.a,
        deletions: sum.deletions + week.d,
      }), {
        additions: 0,
        deletions: 0,
      })
    ),
  }));
  combinedResult.sort((a, b) => (b.commits - a.commits));
  combinedResult.splice(GITHUB.TABLE_LIMIT);
  return combinedResult;
};
const formatCalendar = (data) => {
  const contribs = data.filter(contrib => contrib.author.login === login)[0].weeks;
  const weeks = contribs.map(week => formatWeekMonth(week.w));
  let months = Array.from(new Set(weeks));

  const aggregatedData = {};
  contribs.forEach((week) => {
    const month = formatWeekMonth(week.w);

    if (!(month in aggregatedData)) {
      aggregatedData[month] = {
        additions: week.a,
        deletions: week.d,
        commits: week.c,
      };
    } else {
      aggregatedData[month].additions += week.a;
      aggregatedData[month].deletions += week.d;
      aggregatedData[month].commits += week.c;
    }
  });
  months = trimZeroContribs(months, aggregatedData);

  return {
    additions: months.map(month => aggregatedData[month].additions),
    deletions: months.map(month => aggregatedData[month].deletions),
    commits: months.map(month => aggregatedData[month].commits),
    months,
  };
};


(async () => {
  let gh = null;
  try {
    gh = new Github({ token });
    log.debug('Connected to GitHub.');
  } catch (err) {
    console.error(err);
    log.error('Failed to connect to GitHub.');
    process.exit(1);
  }

  try {
    const authConfig = {
      headers: { Authorization: `token ${token}` },
    };
    await Promise.all(
      Object.keys(REPOSITORY_LIST).map(async (repo) => {
        const repoName = REPOSITORY_LIST[repo];
        try {
          const gitRepo = await gh.getRepo(...repoName.split('/'));
          const data = await Promise.all([
            gitRepo.getDetails(),
            axios.get(`${GITHUB.API}${repoName}/pulls`, authConfig),
            axios.get(`${GITHUB.API}${repoName}/branches`, authConfig),
            axios.get(`${GITHUB.API}${repoName}/downloads`, authConfig),
            getContribRetry(gitRepo, repoName, GITHUB.RETRY, GITHUB.INTERVAL),
          ]);

          const [
            { data: basics },
            { data: pulls },
            { data: branches },
            { data: downloads },
            { data: contribs },
          ] = data;
          const result = {
            basics: formatBasics(basics, pulls, branches, downloads),
            authors: formatTable(contribs),
            contributions: formatCalendar(contribs),
          };
          await writeJsonFile(`repository/${repo}.json`, result);

          log.debug(`GitHub records updated for repository ${colors.blue(repoName)}.`);
        } catch (err) {
          console.error(err);
          log.error(`Failed to update GitHub records for repository ${colors.blue(repoName)}.`);
          throw err;
        }
      })
    );
    log.info('Updated GitHub records.');
  } catch (err) {
    console.error(err);
    log.error('Failed to update GitHub records.');
    process.exit(1);
  }
})();
