import colors from 'colors';
import { promises as fs } from 'fs';
import gitRepoInfo from 'git-repo-info';
import path from 'path';

import { PATH } from '../server/env.js';
import {
  GITHUB,
  RIBOKIT,
  FILE_NAMES,
} from '../server/config.js';
import { glob, writeJsonFile } from '../server/util.js';
import { SECTION_LIST } from '../applications/main/constants/sectionTypes.js';
import { PROJECT_LIST } from '../applications/project/constants/projectTypes.js';
import { REPOSITORY_LIST } from '../applications/project/constants/repositoryTypes.js';
import logger from '../server/logger.js';

import cronJSON from '../config/cron.json';
import pkgJSON from '../package.json';

const mainJSON = SECTION_LIST
  .map(section => ({
    /* eslint-disable */
    [section]: require(`../config/main/${section}.json`),
    /* eslint-enable */
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
const projectJSON = PROJECT_LIST
  .map(project => ({
    /* eslint-disable */
    [project]: require(`../config/project/${project}.json`),
    /* eslint-enable */
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
const repositoryJSON = Object.keys(REPOSITORY_LIST)
  .map(repository => ({
    /* eslint-disable */
    [repository]: require(`../config/repository/${repository}.json`),
    /* eslint-enable */
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});

const log = logger('server:json');
log.debug('All config JSON files loaded.');


const getResume = async () => {
  const resumeFiles = await glob(path.join(PATH.STATIC, 'resume/*.pdf'));
  const fileName = resumeFiles[resumeFiles.length - 1] || '';
  return path.basename(fileName).replace('.pdf', '');
};

const getFileSize = async (fileName) => {
  try {
    const fileStat = await fs.stat(path.join(PATH.PUBLIC, fileName));
    return `${(fileStat.size / 1e6).toFixed(1)} MB`;
  } catch (err) {
    console.error(err);
    log.error(`Failed to get size of file ${colors.blue(fileName)}.`);
  }
  return 'unavailable';
};


const concatMainJson = async () => {
  const config = {
    ...mainJSON,
    navbar: { items: mainJSON.home.sections },
    home: { title: mainJSON.home.title },
    portfolio: {
      ...mainJSON.portfolio,
      selectedCategory: 'all',
      app: {
        version: pkgJSON.version,
        commit: gitRepoInfo().abbreviatedSha,
      },
    },
    pubs: {
      ...mainJSON.pubs,
      thesis: {
        ...mainJSON.pubs.thesis,
        links: await Promise.all(
          mainJSON.pubs.thesis.links.map(async link => ({
            ...link,
            size: await getFileSize(`../static/thesis/${FILE_NAMES.THESIS[link.tag]}`),
          }))
        ),
      },
    },
    contact: {
      ...mainJSON.contact,
      resume: await getResume(),
    },
  };

  let leftCounter = 0;
  let rightCounter = 0;
  config.skills.items.left = config.skills.items.left.map((panel) => {
    const panelWithOffset = {
      ...panel,
      offset: leftCounter,
    };
    leftCounter += panel.items.length;
    return panelWithOffset;
  });
  config.skills.items.right = config.skills.items.right.map((panel) => {
    const panelWithOffset = {
      ...panel,
      offset: rightCounter,
    };
    rightCounter += panel.items.length;
    return panelWithOffset;
  });
  config.skills.lens = {
    left: leftCounter,
    right: rightCounter,
  };

  let pubsCounter = 0;
  config.pubs.items = config.pubs.items.map((year) => {
    const visibleEntries = year.items.filter(item => (!item.isHidden));
    const filteredYear = {
      ...year,
      items: visibleEntries,
      offset: pubsCounter,
    };
    pubsCounter += visibleEntries.length;
    return filteredYear;
  })
  .filter(year => year.items.length);
  config.pubs.lens = pubsCounter;
  config.stats.items[2].value = pubsCounter;

  await writeJsonFile('main.json', config, false);
  log.info('Main JSON compiled.');

  return config.portfolio.app;
};

const concatProjectJson = async () => {
  const updatedProjectJSON = { ...projectJSON };
  PROJECT_LIST.forEach((project) => {
    const updatedJSON = {
      ...projectJSON[project],
      urls: projectJSON[project].urls || {},
    };
    if (updatedJSON.urls.repo) {
      updatedJSON.urls.repo = `${GITHUB.HOST}${updatedJSON.urls.repo}`;
    }
    if (updatedJSON.urls.manual) {
      updatedJSON.urls.manual = `${RIBOKIT}${updatedJSON.urls.manual}`;
    }
    if (updatedJSON.urls.theme) {
      updatedJSON.urls.theme = updatedJSON.urls.theme.map(theme => (
        `${GITHUB.HOST}${theme}`
      ));
    }
    updatedProjectJSON[project] = updatedJSON;
  });

  const data = {
    project: updatedProjectJSON,
    repository: repositoryJSON,
  };
  await writeJsonFile('project.json', data, false);
  log.info('Project JSON compiled.');
};


(async () => {
  try {
    const appInfo = await concatMainJson();
    await concatProjectJson();
    log.info('Data JSON files compiled.');

    const newCronJSON = {
      ...cronJSON,
      repo: appInfo,
    };
    await writeJsonFile('cron.json', newCronJSON);
    log.info('Manifest JSON injected.');
  } catch (err) {
    console.error(err);
    log.error('Failed to compile main and/or project JSON.');
    process.exit(1);
  }
})();
