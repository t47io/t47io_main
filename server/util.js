import { promises as fs } from 'fs';
import { glob as globCallback } from 'glob';
import path from 'path';
import { promisify } from 'util';
import { render as renderCallback } from 'node-sass';
import { exec as execCallback } from 'shelljs';

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

const numArrayRegex = /\[(\d|,|\n| )+\]/g;
export const writeJsonFile = async (filename, json, pretty = true) => {
  let content;
  if (!pretty) {
    content = JSON.stringify(json);
  } else {
    content = JSON.stringify(json, null, 2);
    const numArrays = content.match(numArrayRegex);
    if (numArrays) {
      numArrays.forEach((numArray) => {
        content = content.replace(numArray, numArray.replace(/\n/g, '').replace(/ +/g, ' '));
      });
    }
  }

  const filePath = path.join(PATH.CONFIG, filename);
  await fs.writeFile(filePath, content);
};
export const readJsonFile = async (filename) => {
  const filePath = path.join(PATH.CONFIG, filename);
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
};

export const copyStaticFile = async (filePath, srcPath = '', destPath = '') => {
  const filename = path.basename(filePath);
  return fs.copyFile(
    path.join(PATH.STATIC, typeof srcPath === 'string' ? srcPath : '', filename),
    path.join(PATH.PUBLIC, typeof destPath === 'string' ? destPath : '', filename)
  );
};

export const exec = async cmd => (
  promisify(execCallback)(cmd, { async: true })
);
export const glob = promisify(globCallback);
export const sass = promisify(renderCallback);
