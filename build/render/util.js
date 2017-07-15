import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import sass from 'node-sass';
import shell from 'shelljs';

import {
  ROOT_PATH,
  GA_TRACKER,
  THEMES,
} from '../config.js';


export const replaceHTML = inputHTML => (
  inputHTML
    .replace('<meta data-rdm/>', '<meta charset="utf-8" data-rdm />')
    .replace('<ga />', GA_TRACKER)
    .replace('[object Object]', '')
);

export const loadFileSync = filename => (
  fs.readFileSync(path.join(ROOT_PATH, filename), 'utf8')
);

export const saveFileSync = (filename, content) => {
  const filePath = path.join(ROOT_PATH, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  shell.exec(`zopfli ${filename}`);
  shell.exec(`brotli -f -q 11 -i ${filename} -o ${filename}.br`);
};

export const getThemeColor = () => {
  const index = (new Date().getMonth() + 1) % 6;
  const whichTheme = THEMES[Math.max(0, index - 3)];
  return loadFileSync(`applications/common/themes/${whichTheme}.scss`);
};

export const renderSassSync = filename => (
  postcss([autoprefixer]).process(
    sass.renderSync({
      file: path.join(ROOT_PATH, filename),
      data: `${getThemeColor()}${loadFileSync(filename)}`,
    }).css.toString()
  ).css
);

export const loadImageSync = (filename) => {
  const png = fs.readFileSync(path.join(ROOT_PATH, filename)).toString('base64');
  return `data:image/png;base64,${png}`;
};
