import colors from 'colors';
import fs from 'fs-extra';
import Github from 'github-api';
import path from 'path';

import {
  GITHUB_RETRY,
  GITHUB_INTERVAL,
} from '../config.js';
import {
  REPOSITORY_INTERNAL_NAMES,
  REPOSITORY_LIST,
} from '../../applications/project/constants/repositoryTypes.js';

const { git: { token, login } } = require('../../config/server.json');


const getContribOnce = repo => (
  new Promise((resolve, reject) => (
    repo.getContributorStats()
    .then((json) => {
      // github may respond 202 while it executes query
      if (json.status === 200) { resolve(json); }
      reject('Failed to fetch Github repository contrib');
    })
    .catch(reject)
  ))
);
const getContribRetry = (repo, retry, interval) => (
  getContribOnce(repo)
  .catch(() => {
    if (retry > 0) {
      return Promise((resolve) => {
        setTimeout(() => {
          resolve(getContribRetry(repo, retry - 1, interval));
        }, interval);
      });
    }
    return Promise.reject('retry maxed out.');
  })
);

const formatDateTime = utc => (utc.replace('T', ' ').replace('Z', ''));
const formatBasics = (data, result) => ({
  ...result,
  basics: {
    name: data.full_name,
    url: data.html_url,
    isPrivate: data.private,
    createdAt: formatDateTime(data.created_at),
    pushedAt: formatDateTime(data.pushed_at),
    issues: data.open_issues_count,
    forks: data.forks_count,
    stars: data.stargazers_count,
    watchers: data.watchers_count,
  },
});
const formatContribs = (data, result) => {
  const combinedResult = {
    ...result,
    contributors: data.map(contrib => ({
      author: contrib.author ? contrib.author.login : '(None)',
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
  return combinedResult;
};
const formatCalendar = (data, result) => ({
  ...result,
  additions: data.map(week => (week.a)),
  deletions: data.map(week => (week.d)),
  commits: data.map(week => (week.c)),
  weekRange: [
    data[0].w,
    data[data.length - 1].w,
  ],
});


let gh = null;
try {
  gh = new Github({ token });
} catch (err) {
  console.error(err);
  console.log(`${colors.red('ERROR')}: Failed to connect to GitHub.`);
}

REPOSITORY_LIST.forEach((repoName, i) => {
  try {
    const repo = gh.getRepo(...repoName.split('/'));
    let result = {};

    repo.getDetails()
    .then(({ data }) => { result = formatBasics(data, result); })
    .then(() => getContribRetry(repo, GITHUB_RETRY, GITHUB_INTERVAL))
    .catch(() => { console.error(`${colors.red('ERROR')}: Failed to fetch Github records for repository ${colors.blue(repoName)} after ${GITHUB_RETRY} attempts.`); })
    .then(({ data }) => {
      result = formatContribs(data, result);
      return data.filter(contrib => contrib.author.login === login)[0].weeks;
    })
    .then((data) => { result = formatCalendar(data, result); })
    .then(() => {
      fs.writeJsonSync(path.join(__dirname, '../../config/repository', `${REPOSITORY_INTERNAL_NAMES[i]}.json`), result, { spaces: 2 });
      console.log(`${colors.green('SUCCESS')}: GitHub records updated for repository ${colors.blue(repoName)}.`);
    })
    .catch((error) => {
      console.error(error);
      console.log(`${colors.red('ERROR')}: Failed to process Github records for repository ${colors.blue(repoName)} after ${GITHUB_RETRY} attempts.`);
    });
  } catch (err) {
    console.error(err);
    console.log(`${colors.red('ERROR')}: Failed to update GitHub records for repository ${colors.blue(repoName)}.`);
  }
});

//new Date(x * 1000).toLocaleString('ko-kr', { month: 'numeric', year: 'numeric' }).replace(/\./g, '').replace(' ', '-')
