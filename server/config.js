import emailer from 'nodemailer';
import fs from 'fs';
import glob from 'glob-promise';
import path from 'path';

const env = require('./config/env.json');

const DEBUG = env.DEBUG;
const PORT = env.port;
const GA_ID = env.ga_tracker;
const EMAIL_RECV = env.email.login;

const SMTP = emailer.createTransport(`${env.email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${env.email.password}@${env.email.host}:${env.email.port}`);
const rootPath = path.join(__dirname, '../public');


{
  const about = require('../app/config/about.json');
  const affiliation = require('../app/config/affiliation.json');
  const portfolio = require('../app/config/portfolio.json');
  const skills = require('../app/config/skills.json');
  let stats = require('../app/config/stats.json');
  const pubs = require('../app/config/pubs.json');
  let contact = require('../app/config/contact.json');

  let countPubs = 0;
  for (let i in pubs.items) {
    countPubs += pubs.items[i].items.length;
  }
  stats.items[2].value = countPubs;

  const resumeFiles = glob.sync(path.join(rootPath, 'pdf/Resume*.pdf'));
  contact.resume = path.basename(resumeFiles[resumeFiles.length - 1]);
  const gitFiles = glob.sync(path.join(rootPath, 'data/git_contrib_*.svg'));
  stats.git = path.basename(gitFiles[gitFiles.length - 1]);

  const config = {about, affiliation, portfolio, skills, stats, pubs, contact};
  fs.writeFile('./app/config.json', JSON.stringify(config, null, 2));
}

export {DEBUG, PORT, GA_ID, EMAIL_RECV, SMTP};
