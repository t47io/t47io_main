import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

import { PUBLIC_PATH } from './config.js';
import { SECTION_LIST } from '../applications/main/constants/sectionTypes.js';
import { PROJECT_LIST } from '../applications/project/constants/projectTypes.js';
import { REPOSITORY_INTERNAL_NAMES } from '../applications/project/constants/repositoryTypes.js';

const mainJson = SECTION_LIST
  .map(section => ({
    [section]: require(`../config/main/${section}.json`),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
const projectJson = PROJECT_LIST
  .map(project => ({
    [project]: require(`../config/project/${project}.json`),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
const repositoryJson = REPOSITORY_INTERNAL_NAMES
  .map(repository => ({
    [repository]: require(`../config/repository/${repository}.json`),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});


const getResume = () => {
  const resumeFiles = glob.sync(path.join(PUBLIC_PATH, 'pdf/Resume*.pdf'));
  return path.basename(resumeFiles[resumeFiles.length - 1] || '');
};


const concatMainJSON = () => {
  const config = {
    ...mainJson,
    navbar: { items: mainJson.home.sections },
    home: { title: mainJson.home.title },
    portfolio: {
      ...mainJson.portfolio,
      selectedCategory: 'all',
    },
    contact: {
      ...mainJson.contact,
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
  });
  config.pubs.lens = pubsCounter;
  config.stats.items[2].value = pubsCounter;

  fs.writeJsonSync(path.join(PUBLIC_PATH, '../config/main.json'), config);
};

const concatProjectJSON = () => {
  const data = {
    project: projectJson,
    repository: repositoryJson,
  };
  fs.writeJsonSync(path.join(PUBLIC_PATH, '../config/project.json'), data);
};


try {
  concatMainJSON();
  concatProjectJSON();
  console.log(`${colors.green('SUCCESS')}: Main and project JSON compiled.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to compile main and project JSON.`);
}

