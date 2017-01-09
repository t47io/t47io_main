import emailer from 'nodemailer';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

import {getResumeName, getGitContribName} from './_util.js';

const rootPath = path.join(__dirname, '../public');


(function concatJSON() {
  const home = require('../app/config/home.json');
  const about = require('../app/config/about.json');
  const affiliation = require('../app/config/affiliation.json');
  const portfolio = require('../app/config/portfolio.json');
  const skills = require('../app/config/skills.json');
  let stats = require('../app/config/stats.json');
  const pubs = require('../app/config/pubs.json');
  const contact = require('../app/config/contact.json');

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
    stats: {
      ...stats,
      git: getGitContribName(rootPath)
    },
    pubs,
    contact: {
      ...contact,
      resume: getResumeName(rootPath)
    }
  };

  fs.writeJsonSync(path.join(rootPath, 'config.json'), config);
})();


const env = require('./config/env.json');

const DEBUG = env.DEBUG;
const PORT = env.port;
const EMAIL_RECV = env.email.login;
const SMTP = emailer.createTransport(`${env.email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${env.email.password}@${env.email.host}:${env.email.port}`);


export {DEBUG, PORT, EMAIL_RECV, SMTP};
