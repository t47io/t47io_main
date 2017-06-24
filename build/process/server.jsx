import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob-promise';
import htmlMinifier from 'html-minifier';
import path from 'path';
import purify from 'purify-css';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import MainMeta from '../../applications/main/components/Meta.jsx';

import {
  HTML_MINIFIER,
  ROOT_PATH,
} from '../config.js';
import {
  replaceHTML,
  loadFileSync,
  saveFileSync,
} from '../render/util.js';


const renderMainHTML = () => {
  const baseHTML = loadFileSync('applications/index.html');
  const contentHTML = loadFileSync('public/index.html');
  const mainCSS = purify(
    contentHTML,
    loadFileSync('public/ssr.min.css'),
    { minify: true }
  );

  let mainMETA = renderToStaticMarkup(<MainMeta />);
  mainMETA = DocumentMeta.renderAsHTML();

  return htmlMinifier.minify(
    replaceHTML(baseHTML
      .replace('<meta />', mainMETA)
      .replace('<loader />', '')
      .replace('<div class="body" id="app"></div>', contentHTML)
      .replace('html{}', mainCSS)
    ), HTML_MINIFIER
  )
  .replace(/<% for.*%>/g, '')
  .replace(/<% if.*%>/g, '');
};


try {
  const finalHTML = renderMainHTML();
  saveFileSync('public/index.html', finalHTML);
  console.log(`${colors.green('SUCCESS')}: Index Page SSR finished.`);

  const ssrFiles = glob.sync(path.join(ROOT_PATH, 'public/ssr.*'));
  ssrFiles.forEach(ssr => fs.removeSync(ssr));
  console.log(`${colors.green('SUCCESS')}: SSR temporary files deleted.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to SSR on Index Page.`);
}
