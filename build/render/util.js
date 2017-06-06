import fs from 'fs';
import path from 'path';
import sass from 'node-sass';
import shell from 'shelljs';

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
  const filePath = path.join(__dirname, '../../', filename);
  fs.writeFileSync(filePath, content, 'utf8');
  shell.exec(`zopfli ${filename}`);
  shell.exec(`brotli -f -q 11 -i ${filename} -o ${filename}.br`);
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
