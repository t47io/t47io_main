import path from 'path';

import {
  PUBLIC_PATH,
  DEBUG,
} from './env.js';
import {
  HTTP_CODES,
  HTML_HEADER,
  CACHE_MAX_AGE,
} from './config.js';
import { webpackMiddleware } from './middleware.js';
import { PROJECT_LIST } from '../applications/project/constants/projectTypes.js';

const { contact } = require('../config/main.json');


export const resumeVersion = contact.resume;

export const projectPathRegex = new RegExp(`^/project/(${PROJECT_LIST.join('|')})/?$`);
export const errorPathRegex = new RegExp(`^/error/(${HTTP_CODES.join('|')})/?$`);

export const getZipExt = headers => (
  headers['accept-encoding'].includes('br') ? 'br' : 'gzip'
);
export const getHeader = (req, dev = false) => {
  const encoding = dev ? {} : { 'Content-Encoding': getZipExt(req.headers) };
  return {
    ...HTML_HEADER,
    ...encoding,
  };
};

export const sendHtmlFromCache = (name, render, req, res) => {
  const HTML = webpackMiddleware.fileSystem.readFileSync(
    path.join(PUBLIC_PATH, `${name}.html`), 'utf8'
  );
  res.set(getHeader(req, DEBUG)).send(render(HTML));
};
export const sendHtmlFromDisk = (name, req, res) => {
  const ext = getZipExt(req.headers);

  res.sendFile(path.join(PUBLIC_PATH, `${name}.html.${ext}`), {
    headers: getHeader(req, DEBUG),
    maxAge: `${CACHE_MAX_AGE} days`,
  });
};

export const sendErrorResponse = (code) => {
  const err = new Error();
  err.status = code;
  return err;
};
