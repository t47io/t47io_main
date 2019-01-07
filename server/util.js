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
  const encoding = headers['accept-encoding'] || '';
  const zipType = encoding.includes('br') ? 'br' : 'gzip';
  return zipType.slice(0, length);
};
export const getHeader = (req, forceHeader = false) => {
  const saveData = (req.headers['save-data'] === 'on') && 'Save-Data';
  const encoding = getZipExt(req.headers);
  const header = (!forceHeader && DEBUG) ? {} : {
    'Content-Encoding': encoding,
    Vary: ['Accept-Encoding', saveData].filter(Boolean),
  };
  return {
    ...HTML_HEADER,
    ...header,
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

export const getToday = (regex = '', end = 10) => (
  new Date().toISOString().slice(0, end).replace(regex, '')
);
export const getNow = (regex = '', end = -1) => (
  new Date().toISOString().slice(0, end).replace(regex, '')
);
