import axios from 'axios';
import colors from 'colors';
import fs from 'fs-extra';
import Github from 'github-api';
import path from 'path';

import { REPOSITORY_LIST } from '../../applications/project/constants/repositoryTypes.js';

const config = require('../../config/server.json');


const getContribOnce = repo => (
  new Promise((resolve, reject) => (
    repo.getContributorStats()
    .then((json) => {
      if (json.status === 200) {
        resolve(json);
      }
      reject('Failed to fetch Github repository contrib');
    })
    .catch(reject)
  ))
);

const getContribRetry = (repo, retry, interval) => (
  getContribOnce(repo)
  .catch(() => {
    if (retry > 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getContribRetry(repo, retry - 1, interval));
        }, interval);
      });
    }
    return Promise.reject('retry maxed out.');
  })
);


const RETRY = 5;
const INTERVAL = 1000;

const gh = new Github({ token: config.gitToken });

const repoName = REPOSITORY_LIST[1];
// REPOSITORY_LIST.forEach((repoName) => {
const repo = gh.getRepo(...repoName.split('/'));
const result = {
  stats: {},
  contrib: [],
  additions: [],
  deletions: [],
  commits: [],
};

repo.getDetails()
.then(({ data }) => {
  result.stats = {
    name: data.full_name,
    url: data.html_url,
    timeCreated: data.created_at,
    timePushed: data.pushed_at,
    issues: data.open_issues_count,
    forks: data.forks_count,
    stars: data.stargazers_count,
    watchers: data.watchers_count,
  };
})
.then(() => getContribRetry(repo, RETRY, INTERVAL))
.catch(() => {
  console.error(`Failed to fetch Github repository contrib after ${RETRY} attempts.`);
})
.then(({ data }) => {
  result.contrib = data.map(contrib => ({
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
  }));
  result.contrib.sort((a, b) => (b.commits - a.commits));
})
.then(() => { console.log(result); });


// });
