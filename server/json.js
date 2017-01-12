import fs from 'fs-extra';
import path from 'path';

import {getResume} from './_util.js';


const concatIndexJSON = (rootPath) => {
  const home = require('../config/index/home.json');
  const about = require('../config/index/about.json');
  const affiliation = require('../config/index/affiliation.json');
  const portfolio = require('../config/index/portfolio.json');
  const skills = require('../config/index/skills.json');
  let stats = require('../config/index/stats.json');
  const pubs = require('../config/index/pubs.json');
  const contact = require('../config/index/contact.json');

  let countPubs = 0;
  for (let i in pubs.items) {
    countPubs += pubs.items[i].items.filter((item) => (!item.is_hidden)).length;
  }
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
      resume: getResume(rootPath)
    }
  };

  fs.writeJsonSync(path.join(rootPath, 'config.json'), config);
};


export {concatIndexJSON};
