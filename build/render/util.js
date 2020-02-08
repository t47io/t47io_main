import autoprefixer from 'autoprefixer';
import fs from 'fs-extra';
import path from 'path';
import postcss from 'postcss';
import sass from 'node-sass';
import shell from 'shelljs';
import { promisify } from 'util';

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
export const loadFile = async (filename) => (
  await fs.readFile(path.join(ROOT, filename), 'utf8')
);

export const saveFileSync = (filename, content) => {
  const filePath = path.join(ROOT, filename);
  fs.outputFileSync(filePath, content);
  shell.exec(`zopfli ${filename}`);
  shell.exec(`brotli -Zf -o ${filename}.br ${filename}`);
};
export const saveFile = async (filename, content) => {
  const filePath = path.join(ROOT, filename);
  await fs.outputFile(filePath, content);
  await shell.exec(`zopfli ${filename}`, { async: true });
  await shell.exec(`brotli -Zf -o ${filename}.br ${filename}`, { async: true });
};

export const getThemeColor = async () => {
  const index = (new Date().getMonth() + 1) % 6;
  const whichTheme = THEME_COLORS[Math.max(0, index - 3)];
  return await loadFile(`applications/common/themes/${whichTheme}.scss`);
};

export const renderSassSync = filename => (
  postcss([autoprefixer]).process(
    sass.renderSync({
      file: path.join(ROOT, filename),
      data: `${getThemeColor()}${loadFileSync(filename)}`,
    }).css.toString()
  ).css
);
export const renderSass = async (filename) => {
  const contentSASS = await loadFile(filename);
  const themeSASS = await getThemeColor();
  const renderedCSS = await promisify(sass.render)({
      file: path.join(ROOT, filename),
      data: `${themeSASS}${contentSASS}`,
  });
  const processedCSS = await postcss([autoprefixer]).process(renderedCSS.css, { from: ROOT });
  return processedCSS.css;
};

export const loadImage = async (filename) => {
  const img = await fs.readFile(path.join(ROOT, filename), 'utf8');
  return `data:image/svg+xml,${encodeURIComponent(img)}`;
};

export const replaceBgRNA = async (inputCSS) => {
  const rnaSVG = await loadImage(BG_RNA_SVG);
  return inputCSS.replace('../images/bg_rna.svg', rnaSVG)
};
