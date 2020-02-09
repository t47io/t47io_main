import autoprefixer from 'autoprefixer';
import { promises as fs, readFileSync } from 'fs';
import path from 'path';
import postcss from 'postcss';

import { PATH } from '../../server/env.js';
import {
  GA_TRACKER,
  BG_RNA_SVG,
} from '../config.js';
import { THEME_COLORS } from '../../applications/main/constants/util.js';
import {
  exec,
  sass,
} from '../../server/util.js';


const templateClauseStart = '<% (?:if|for) \\([a-zA-Z\\. !]*?\\) { %>';
const templateClauseEnd = '<% } %>';
const templateClausePair = `${templateClauseStart}(?:(?!${templateClauseStart}|${templateClauseEnd}).)*?${templateClauseEnd}`;
export const templatePairRegex = new RegExp(templateClausePair, 'g');

export const replaceHtml = inputHTML => (
  inputHTML
    .replace('<meta data-rdm/>', '<meta charset="utf-8" data-rdm />')
    .replace('<ga />', GA_TRACKER)
    .replace('[object Object]', '')
);

export const loadFile = async filename => (
  fs.readFile(path.join(PATH.ROOT, filename), 'utf8')
);

export const saveFile = async (filename, content) => {
  await fs.writeFile(path.join(PATH.ROOT, filename), content);
  await exec(`zopfli ${filename}`);
  await exec(`brotli -Zf -o ${filename}.br ${filename}`);
};

export const getThemeColor = () => {
  const index = (new Date().getMonth() + 1) % 6;
  const whichTheme = THEME_COLORS[Math.max(0, index - 3)];
  return readFileSync(`applications/common/themes/${whichTheme}.scss`);
};

export const renderSass = async (filename) => {
  const contentSASS = await loadFile(filename);
  const themeSASS = getThemeColor();
  const renderConfig = {
    file: path.join(PATH.ROOT, filename),
    data: `${themeSASS}${contentSASS}`,
  };
  const renderedCSS = await sass(renderConfig);
  const processedCSS = await postcss([autoprefixer]).process(renderedCSS.css, { from: PATH.ROOT });
  return processedCSS.css;
};

export const replaceBgRNA = async (inputCSS) => {
  const imgSVG = await loadFile(BG_RNA_SVG);
  const rnaSVG = `data:image/svg+xml,${encodeURIComponent(imgSVG)}`;
  return inputCSS.replace('../images/bg_rna.svg', rnaSVG);
};
