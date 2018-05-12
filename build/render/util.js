import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import sass from 'node-sass';
import shell from 'shelljs';

import { ROOT } from '../../server/env.js';
import {
  GA_TRACKER,
  BG_RNA_SVG,
} from '../config.js';
import { THEME_COLORS } from '../../applications/main/constants/util.js';


const templateClauseStart = '<% (?:if|for) \\([a-zA-Z\\. !]*?\\) { %>';
const templateClauseEnd = '<% } %>';
const templateClausePair = `${templateClauseStart}(?:(?!${templateClauseStart}|${templateClauseEnd}).)*?${templateClauseEnd}`;
export const templatePairRegex = new RegExp(templateClausePair, 'g');

export const replaceHTML = inputHTML => (
  inputHTML
    .replace('<meta data-rdm/>', '<meta charset="utf-8" data-rdm />')
    .replace('<ga />', GA_TRACKER)
    .replace('[object Object]', '')
);

export const loadFileSync = filename => (
  fs.readFileSync(path.join(ROOT, filename), 'utf8')
);

export const saveFileSync = (filename, content) => {
  const filePath = path.join(ROOT, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  shell.exec(`zopfli ${filename}`);
  shell.exec(`brotli -Zf -o ${filename}.br ${filename}`);
};

export const getThemeColor = () => {
  const index = (new Date().getMonth() + 1) % 6;
  const whichTheme = THEME_COLORS[Math.max(0, index - 3)];
  return loadFileSync(`applications/common/themes/${whichTheme}.scss`);
};

export const renderSassSync = filename => (
  postcss([autoprefixer]).process(
    sass.renderSync({
      file: path.join(ROOT, filename),
      data: `${getThemeColor()}${loadFileSync(filename)}`,
    }).css.toString()
  ).css
);

export const loadImageSync = (filename) => {
  const img = fs.readFileSync(path.join(ROOT, filename));
  return `data:image/svg+xml,${encodeURIComponent(img)}`;
};

const rnaSVG = loadImageSync(BG_RNA_SVG);
export const replaceBgRNA = inputCSS => (
  inputCSS.replace('../images/bg_rna.svg', rnaSVG)
);
