import colors from 'colors';
import path from 'path';

import {
  PATH,
  DEBUG,
} from './env.js';
import {
  HTTP_CODES,
  HTML_HEADER,
  FILE_NAMES,
} from './config.js';
import { PROJECT_LIST } from '../applications/project/constants/projectTypes.js';

import mainJSON from '../config/main.json';


const SUCCESS = colors.green('SUCCESS');
const WARNING = colors.yellow('WARNING');
const ERROR = colors.red('ERROR');
export const logger = script => ({
  info: (msg) => {
    console.log(`${colors.magenta(`[${script}]`)} ${msg}`);
  },
  success: (msg) => {
    console.log(`${colors.magenta(`[${script}]`)} ${SUCCESS}: ${msg}`);
  },
  warning: (msg) => {
    console.log(`${colors.magenta(`[${script}]`)} ${WARNING}: ${msg}`);
  },
  error: (msg) => {
    console.log(`${colors.magenta(`[${script}]`)} ${ERROR}: ${msg}`);
  },
});


export const resumeVersion = mainJSON.contact.resume;
export const pubTags = mainJSON.pubs.items.map(obj => (
  obj.items.map(item => item.tag)
))
.reduce((list, item) => ([
  ...list,
  ...item,
]), []);

export const pubsPathRegex = new RegExp(`^/pdf/(${pubTags.join('|')})/?$`);
export const thesisPathRegex = new RegExp(`^/phd/(${Object.keys(FILE_NAMES.THESIS).join('|')})/?$`);
export const projectPathRegex = new RegExp(`^/project/(${PROJECT_LIST.join('|')})/?$`);
export const errorPathRegex = new RegExp(`^/error/(${HTTP_CODES.join('|')})/?$`);

export const getZipExt = (headers, length = 4) => {
  const zipType = headers['accept-encoding'].includes('br') ? 'br' : 'gzip';
  return zipType.slice(0, length);
};
export const getHeader = (req, forceHeader = false) => {
  const encoding = (!forceHeader && DEBUG) ? {} : {
    'Content-Encoding': getZipExt(req.headers),
    Vary: 'Accept-Encoding',
  };
  return {
    ...HTML_HEADER,
    ...encoding,
  };
};

export const getPubFile = name => (
  path.join(PATH.PUBLIC, `/docs/${name}.pdf`)
);
export const getThesisFile = name => (
  path.join(PATH.PUBLIC, `/docs/${FILE_NAMES.THESIS[name]}`)
);

export const sendErrorResponse = (code) => {
  const err = new Error();
  err.status = code;
  return err;
};

export const today = new Date().toISOString().slice(0, 10);
