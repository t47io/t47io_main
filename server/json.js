import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

const home = require('../config/main/home.json');
const about = require('../config/main/about.json');
const affiliation = require('../config/main/affiliation.json');
const portfolio = require('../config/main/portfolio.json');
const skills = require('../config/main/skills.json');
const stats = require('../config/main/stats.json');
const pubs = require('../config/main/pubs.json');
const contact = require('../config/main/contact.json');


const getResume = (rootPath) => {
  const resumeFiles = glob.sync(path.join(rootPath, 'pdf/Resume*.pdf'));
  return path.basename(resumeFiles[resumeFiles.length - 1]);
};

const concatIndexJSON = (rootPath) => {
  let leftCounter = 0;
  let rightCounter = 0;
  skills.items.left = skills.items.left.map((panel) => {
    const panelWithOffset = {
      ...panel,
      offset: leftCounter,
    };
    leftCounter += panel.items.length;
    return panelWithOffset;
  });
  skills.items.right = skills.items.right.map((panel) => {
    const panelWithOffset = {
      ...panel,
      offset: rightCounter,
    };
    rightCounter += panel.items.length;
    return panelWithOffset;
  });

  let pubsCounter = 0;
  pubs.items = pubs.items.map((year) => {
    const visibleEntries = year.items.filter(item => (!item.isHidden));
    const filteredYear = {
      ...year,
      items: visibleEntries,
      offset: pubsCounter,
    };
    pubsCounter += visibleEntries.length;
    return filteredYear;
  });

  const config = {
    navbar: { items: home.sections.map(section => section.toUpperCase()) },
    home: { title: home.title },
    about,
    affiliation,
    portfolio: {
      ...portfolio,
      selectedCategory: 'all',
    },
    skills: {
      ...skills,
      lens: {
        left: leftCounter,
        right: rightCounter,
      },
    },
    stats: {
      ...stats,
      items: [
        ...(stats.items.slice(0, 2)),
        {
          ...(stats.items[2]),
          value: pubsCounter,
        },
        ...(stats.items.slice(3)),
      ],
    },
    pubs: {
      ...pubs,
      lens: pubsCounter,
    },
    contact: {
      ...contact,
      resume: getResume(rootPath),
    },
  };

  fs.writeJsonSync(path.join(rootPath, 'config.json'), config);
};


export {
  concatIndexJSON,
  getResume,
};
