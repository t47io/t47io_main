import fs from 'fs';
import path from 'path';
import sass from 'node-sass';
import zlib from 'zlib';

import {
  GA_TRACKER,
  IE9_SHIM,
} from './config.js';


export const replaceHTML = inputHTML => (
  inputHTML
    .replace('<meta data-rdm/>', '<meta charset="utf-8" data-rdm />')
    .replace('<ga />', `${GA_TRACKER}${IE9_SHIM}`)
    .replace('[object Object]', '')
);


export const loadFileSync = filename => (
  fs.readFileSync(path.join(__dirname, '../../', filename), 'utf8')
);

export const saveFileSync = (filename, content) => {
  const filePath = path.join(__dirname, '../../', `${filename}.gz`);
  zlib.gzip(new Buffer(content, 'utf-8'), (_, result) => {
    fs.writeFileSync(filePath, result, 'utf8');
  });
};

export const renderSassSync = filename => (
  sass.renderSync({
    file: path.join(__dirname, '../../', filename),
  }).css.toString()
);

export const loadImageSync = (filename) => {
  const png = fs.readFileSync(
    path.join(__dirname, '../../', filename)
  ).toString('base64');
  return `data:image/png;base64,${png}`;
};
