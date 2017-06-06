import emailer from 'nodemailer';
import path from 'path';

const { mode, port, email } = require('../config/server.json');


export const PUBLIC_PATH = path.join(__dirname, '../public');

export const DEBUG = mode.debug;
export const MAINTENANCE = mode.maintenance;
export const PORT = port;

export const EMAIL_CONTENT_LEN = 10;
export const EMAIL_RECV = email.login;
export const SMTP = emailer.createTransport(`${email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${email.password}@${email.host}:${email.port}`);

export const HTTP_CODE = [201, 400, 401, 403, 404, 405, 500, 502, 503];
export const HTML_HEADER = {
  'Content-Type': 'text/html; charset=UTF-8',
  'X-UA-Compatible': 'IE=edge',
};
export const CACHE_MAX_AGE = 120;

export const GITHUB_RETRY = 5;
export const GITHUB_INTERVAL = 1000;
export const GITHUB_TABLE_LIMIT = 4;
export const GITHUB_DEFUALT_AUTHOR = '(None)';
export const GITHUB_REPO_API = 'https://api.github.com/repos/';

export const JSON_FORMAT = { spaces: 2 };

export const BACKUP_FILE_NAME = 'backup.tar.gz';
export const FAVICO_FILE_NAME = 't47_icon.png';
export const DEFENSE_FILE_NAME = 't47_phd_defense.png';
export const RESUME_FILE_NAME = 'SiqiTian_resume';

export const BOT_USER_AGENTS = [
  'googlebot',
  'yahoo',
  'bingbot',
  'yandex',
  'applebot',
  'msnbot',
  'yeti',
  'yodaobot',
  'gigabot',
  'slurp',
  'facebookexternalhit',
  'twitterbot',
  'developers.google.com',
];
