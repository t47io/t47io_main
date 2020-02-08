import emailer from 'nodemailer';
import path from 'path';

import serverJSON from '../config/server.json';

/* eslint-disable object-curly-newline */
const { mode, port, email, chmod } = serverJSON;
/* eslint-enable */


const ROOT = path.join(__dirname, '../');
export const PATH = {
  HOME: chmod.home,
  ROOT,
  APP: path.join(ROOT, 'applications/'),
  BACKUP: path.join(ROOT, 'backup/'),
  BUILD: path.join(ROOT, 'build/'),
  CONFIG: path.join(ROOT, 'config/'),
  STATIC: path.join(ROOT, 'static/'),
  PUBLIC: path.join(ROOT, 'public/'),
};

export const DEBUG = mode.debug;
export const NGINX = mode.nginx;
export const MAINTENANCE = mode.maintenance;
export const PORT = port;

export const EMAIL_RECV = email.login;
export const SMTP = emailer.createTransport(`${email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${email.password}@${email.host}:${email.port}`);

export const CHMOD = {
  USER: chmod.user,
  GROUP: chmod.group,
  EXCLUDES: ['node_modules', '.git'],
};
