import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';

import { PATH } from './env.js';
import {
  GITHUB,
  RIBOKIT,
  FILE_NAMES,
} from './config.js';
import { SECTION_LIST } from '../applications/main/constants/sectionTypes.js';
import { PROJECT_LIST } from '../applications/project/constants/projectTypes.js';
import { REPOSITORY_INTERNAL_NAMES } from '../applications/project/constants/repositoryTypes.js';

const mainJSON = SECTION_LIST
  .map(section => ({
    [section]: require(`../config/main/${section}.json`),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
const projectJSON = PROJECT_LIST
  .map(project => ({
    [project]: require(`../config/project/${project}.json`),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
const repositoryJSON = REPOSITORY_INTERNAL_NAMES
  .map(repository => ({
    [repository]: require(`../config/repository/${repository}.json`),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});

const SCRIPT = 'server:json';
console.log(`${colors.magenta(`[${SCRIPT}]`)} All config JSON files loaded.`);


const getResume = () => {
  const resumeFiles = glob.sync(path.join(PATH.STATIC, 'resume/*.pdf'));
  const fileName = resumeFiles[resumeFiles.length - 1] || '';
  return path.basename(fileName).replace('.pdf', '');
};

const getFileSize = (fileName) => {
  try {
    const byteSize = fs.statSync(path.join(PATH.PUBLIC, fileName)).size;
    return `${(byteSize / 1e6).toFixed(1)} MB`;
  } catch (err) {
    console.error(err);
    console.log(`${colors.red('ERROR')}: Failed to get size of file ${colors.blue(fileName)}.`);
  }
  return 'unavailable';
};


const concatMainJSON = () => {
  const config = {
    ...mainJSON,
    navbar: { items: mainJSON.home.sections },
    home: { title: mainJSON.home.title },
    portfolio: {
      ...mainJSON.portfolio,
      selectedCategory: 'all',
    },
    pubs: {
      ...mainJSON.pubs,
      thesis: {
        ...mainJSON.pubs.thesis,
        links: mainJSON.pubs.thesis.links.map(link => ({
          ...link,
          size: getFileSize(`../static/thesis/${FILE_NAMES.THESIS[link.tag]}`),
        })),
      },
    },
    contact: {
      ...mainJSON.contact,
      resume: getResume(),
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

  fs.writeJSONSync(path.join(PATH.CONFIG, 'main.json'), config);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Main JSON compiled.`);
};

const concatProjectJSON = () => {
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
  fs.writeJSONSync(path.join(PATH.CONFIG, 'project.json'), data);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Project JSON compiled.`);
};


try {
  concatMainJSON();
  concatProjectJSON();

  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Data JSON files compiled.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to compile main and/or project JSON.`);
  process.exit(1);
}
