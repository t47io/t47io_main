import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';


const getResume = (rootPath) => {
  const resumeFiles = glob.sync(path.join(rootPath, 'pdf/Resume*.pdf'));
  return path.basename(resumeFiles[resumeFiles.length - 1]);
};

const concatIndexJSON = (rootPath) => {
  const home = require('../config/index/home.json');
  const about = require('../config/index/about.json');
  const affiliation = require('../config/index/affiliation.json');
  const portfolio = require('../config/index/portfolio.json');
  const skills = require('../config/index/skills.json');
  const stats = require('../config/index/stats.json');
  const pubs = require('../config/index/pubs.json');
  const contact = require('../config/index/contact.json');

  let countPubs = 0;
  Object.keys(pubs.items).forEach((key) => {
    countPubs += pubs.items[key].items.filter(item => (!item.is_hidden)).length;
  });
  stats.items[2].value = countPubs;

  const config = {
    home,
    about,
    affiliation,
    portfolio,
    skills,
    stats,
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
