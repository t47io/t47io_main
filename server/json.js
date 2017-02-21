import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

const home = require('../config/index/home.json');
const about = require('../config/index/about.json');
const affiliation = require('../config/index/affiliation.json');
const portfolio = require('../config/index/portfolio.json');
const skills = require('../config/index/skills.json');
const stats = require('../config/index/stats.json');
const pubs = require('../config/index/pubs.json');
const contact = require('../config/index/contact.json');


const getResume = (rootPath) => {
  const resumeFiles = glob.sync(path.join(rootPath, 'pdf/Resume*.pdf'));
  return path.basename(resumeFiles[resumeFiles.length - 1]);
};

const concatIndexJSON = (rootPath) => {
  let countPubs = 0;
  Object.keys(pubs.items).forEach((key) => {
    countPubs += pubs.items[key].items.filter(item => (!item.is_hidden)).length;
  });

  const config = {
    home,
    about,
    affiliation,
    portfolio,
    skills,
    stats: {
      ...stats,
      items: [
        ...(stats.items.slice(0, 2)),
        {
          ...(stats.items[2]),
          value: countPubs,
        },
        ...(stats.items.slice(3)),
      ],
    },
    pubs,
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
