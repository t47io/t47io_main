import axios from 'axios';
import colors from 'colors';
import fs from 'fs-extra';
import Github from 'github-api';
import path from 'path';

import { PATH } from '../env.js';
import {
  GITHUB,
  JSON_FORMAT,
} from '../config.js';
import {
  REPOSITORY_INTERNAL_NAMES,
  REPOSITORY_LIST,
} from '../../applications/project/constants/repositoryTypes.js';

import serverJSON from '../../config/server.json';

const { git: { token, login } } = serverJSON;
const SCRIPT = 'cron:repo';


const getContribOnce = (repo, repoName) => (
  new Promise((resolve, reject) => (
    repo.getContributorStats()
    .then((json) => {
      // github may respond 202 while it executes query
      if (json.status === 200) {
        resolve(json);
      } else {
        console.log(`${colors.magenta(`[${SCRIPT}]`)} Fetching Github records for repository ${colors.blue(repoName)} returned ${colors.red(json.status)}, retrying...`);
        reject('Failed to fetch Github repository contrib');
      }
    })
    .catch(reject)
  ))
);
const getContribRetry = (repo, repoName, retry, interval) => (
  getContribOnce(repo, repoName)
  .catch(() => {
    if (retry > 0) {
      return new Promise(resolve => (
        setTimeout(() => (
          resolve(getContribRetry(repo, repoName, retry - 1, interval * 2))
        ), interval)
      ));
    }
    return Promise.reject('retry maxed out.');
  })
);

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
const formatBasics = ({ data, pulls, branches, downloads }, result) => ({
  ...result,
  basics: {
    name: data.full_name,
    isPrivate: data.private,
    createdAt: formatDateTime(data.created_at),
    pushedAt: formatDateTime(data.pushed_at),
    issues: data.open_issues_count,
    downloads,
    forks: data.forks_count,
    pulls,
    branches,
    stars: data.stargazers_count,
    watchers: data.watchers_count,
  },
});
const formatTable = (data, result) => {
  const combinedResult = {
    ...result,
    contributors: data.map(contrib => ({
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
    })),
  };
  combinedResult.contributors.sort((a, b) => (b.commits - a.commits));
  combinedResult.contributors.splice(GITHUB.TABLE_LIMIT);
  return combinedResult;
};
const formatCalendar = (data, result) => {
  const weeks = data.map(week => formatWeekMonth(week.w));
  let months = weeks.filter((week, i, self) => (self.indexOf(week) === i));

  const aggregatedData = {};
  data.forEach((week) => {
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
    ...result,
    additions: months.map(month => aggregatedData[month].additions),
    deletions: months.map(month => aggregatedData[month].deletions),
    commits: months.map(month => aggregatedData[month].commits),
    months,
  };
};


let gh = null;
try {
  gh = new Github({ token });
} catch (err) {
  console.error(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to connect to GitHub.`);
  process.exit(1);
}

REPOSITORY_LIST.forEach((repoName, i) => {
  try {
    const repo = gh.getRepo(...repoName.split('/'));
    let result = {};

    axios.all([
      repo.getDetails(),
      axios.get(`${GITHUB.API}${repoName}/pulls?access_token=${token}`),
      axios.get(`${GITHUB.API}${repoName}/branches?access_token=${token}`),
      axios.get(`${GITHUB.API}${repoName}/downloads?access_token=${token}`),
    ])
    .then(axios.spread((details, pulls, branches, downloads) => ({
      data: details.data,
      pulls: pulls.data.length,
      branches: branches.data.length,
      downloads: downloads.data.length,
    })))
    .then((data) => { result = formatBasics(data, result); })
    .then(() => getContribRetry(repo, repoName, GITHUB.RETRY, GITHUB.INTERVAL))
    .catch((err) => { throw err; })
    .then(({ data }) => {
      result = formatTable(data, result);
      return data.filter(contrib => contrib.author.login === login)[0].weeks;
    })
    .then((data) => { result = formatCalendar(data, result); })
    .then(() => {
      fs.writeJSONSync(path.join(PATH.CONFIG, 'repository/', `${REPOSITORY_INTERNAL_NAMES[i]}.json`), result, JSON_FORMAT);
      console.log(`${colors.magenta(`[${SCRIPT}]`)} GitHub records updated for repository ${colors.blue(repoName)}.`);
    })
    .catch((err) => { throw err; });
  } catch (err) {
    console.error(err);
    console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to update GitHub records for repository ${colors.blue(repoName)}.`);
  }
});

console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Updated GitHub records.`);
