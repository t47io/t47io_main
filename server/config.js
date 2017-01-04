import emailer from 'nodemailer';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';


const rootPath = path.join(__dirname, '../public');


const getResume = () => {
  const resumeFiles = glob.sync(path.join(rootPath, 'pdf/Resume*.pdf'));
  return path.basename(resumeFiles[resumeFiles.length - 1]);
};

const getGitContrib = () => {
  const gitFiles = glob.sync(path.join(rootPath, 'data/git_contrib_*.svg'));
  const latestGitFile = gitFiles[gitFiles.length - 1];

  fs.removeSync(path.join(rootPath, 'data/git_contrib.svg'));
  fs.copySync(latestGitFile, path.join(rootPath, 'data/git_contrib.svg'))
  return path.basename(latestGitFile);
};


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
    countPubs += pubs.items[i].items.length;
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
      git: getGitContrib()
    },
    pubs,
    contact: {
      ...contact,
      resume: getResume()
    }
  };

  fs.writeJsonSync(path.join(rootPath, 'config.json'), config);
})();


const env = require('./config/env.json');

const DEBUG = env.DEBUG;
const PORT = env.port;
const GA_ID = env.ga_tracker;
const EMAIL_RECV = env.email.login;

const SMTP = emailer.createTransport(`${env.email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${env.email.password}@${env.email.host}:${env.email.port}`);


export {DEBUG, PORT, GA_ID, EMAIL_RECV, SMTP};
