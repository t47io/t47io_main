import htmlMinifier from 'html-minifier';
import purify from 'purify-css';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import MainMeta from '../../applications/main/components/Meta.jsx';

import { HTML_MINIFIER } from '../config.js';
import {
  templatePairRegex,
  replaceHtml,
  loadFile,
  saveFile,
} from '../render/util.js';
import logger from '../../server/logger.js';

const log = logger('process:server');


const renderMainHtml = async () => {
  const baseHTML = await loadFile('applications/index.html');
  const contentHTML = await loadFile('public/tmp/_ssr.html');
  const contentCSS = await loadFile('public/tmp/_ssr.min.css');
  const mainCSS = purify(contentHTML, contentCSS, { minify: true });

  let mainMETA = renderToStaticMarkup(<MainMeta />);
  mainMETA = DocumentMeta.renderAsHTML();

  let outputHTML = htmlMinifier.minify(
    replaceHtml(
      baseHTML
      .replace('<meta />', mainMETA)
      .replace('<loader />', '')
      .replace('<div class="body" id="app"></div>', contentHTML)
      .replace('html{}', mainCSS)
    ), HTML_MINIFIER
  );
  while (templatePairRegex.test(outputHTML)) {
    outputHTML = outputHTML.replace(templatePairRegex, '');
  }
  return outputHTML.replace(/<noscript>.*<\/noscript>/, '');
};


(async () => {
  try {
    log.debug('Creating Index Page SSR...');
    const finalHTML = await renderMainHtml();
    await saveFile('public/index.html', finalHTML);
    log.info('Index Page SSR created.');
  } catch (err) {
    console.error(err);
    log.error('Failed to SSR on Index Page.');
    process.exit(1);
  }
})();
