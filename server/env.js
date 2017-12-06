import emailer from 'nodemailer';
import path from 'path';

import serverJSON from '../config/server.json';

const { mode, port, email, chmod } = serverJSON;


export const ROOT = path.join(__dirname, '../');
export const PATH = {
  APP: path.join(ROOT, 'applications/'),
  BACKUO: path.join(ROOT, 'backup/'),
  CONFIG: path.join(ROOT, 'config/'),
  STATIC: path.join(ROOT, 'static/'),
  PUBLIC: path.join(ROOT, 'public/'),
};

export const DEBUG = mode.debug;
export const NGINX = mode.nginx;
export const MAINTENANCE = mode.maintenance;
export const PORT = port;

export const EMAIL_CONTENT_LEN = 10;
export const EMAIL_RECV = email.login;
export const SMTP = emailer.createTransport(`${email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${email.password}@${email.host}:${email.port}`);

export const CHMOD = {
  USER: chmod.user,
  GROUP: chmod.group,
  EXCLUDES: ['node_modules', '.git'],
};
