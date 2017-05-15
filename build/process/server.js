import htmlMinifier from 'html-minifier';
import purify from 'purify-css';

import { HTML_MINIFIER } from '../render/config.js';
import {
  replaceHTML,
  loadFileSync,
  saveFileSync,
} from '../render/util.js';


const baseHTML = loadFileSync('applications/index.html');
const contentHTML = loadFileSync('public/index.html');
const mainCSS = purify(
  contentHTML,
  loadFileSync('public/ssr.min.css'),
  { minify: true }
);
const finalHTML = htmlMinifier.minify(
  replaceHTML(baseHTML
    .replace('<meta />', '')
    .replace('<loader />', '')
    .replace('<div class="body" id="app"></div>', contentHTML)
    .replace('html{}', mainCSS)
  ), HTML_MINIFIER
);

saveFileSync('public/main.html', finalHTML);
