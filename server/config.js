import emailer from 'nodemailer';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

import {getResumeName} from './_util.js';

const rootPath = path.join(__dirname, '../public');


(function concatJSON() {
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
      resume: getResumeName(rootPath)
    }
  };

  fs.writeJsonSync(path.join(rootPath, 'config.json'), config);
})();


const env = require('../config/server.json');

const DEBUG = env.DEBUG;
const PORT = env.port;
const EMAIL_RECV = env.email.login;
const SMTP = emailer.createTransport(`${env.email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${env.email.password}@${env.email.host}:${env.email.port}`);


export {DEBUG, PORT, EMAIL_RECV, SMTP};
