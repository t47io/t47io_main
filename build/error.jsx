import colors from 'colors';
import fs from 'fs';
import htmlMinifier from 'html-minifier';
import path from 'path';
import purify from 'purify-css';
import sass from 'node-sass';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import ErrorPage from '../applications/error/containers/ErrorPage.jsx';

const json = require('../config/error.json');

const codes = Object.keys(json).map(code => parseInt(code, 10));
const images = codes.map((code) => {
  const png = fs.readFileSync(
    path.join(__dirname, '../applications/error/images/', `${code}.png`)
  ).toString('base64');
  return `data:image/png;base64,${png}`;
});
const loadFileSync = filename => fs.readFileSync(path.join(__dirname, filename), 'utf8');


try {
  const baseHTML = loadFileSync('../public/error.html');
  const copySVG = loadFileSync('../applications/error/images/copyright.svg');
  const ccSVG = loadFileSync('../applications/error/images/creative-commons.svg');

  const rawCSS = sass.renderSync({
    file: path.join(__dirname, '../applications/error/stylesheets/index.scss'),
  }).css.toString();

  codes.forEach((code, i) => {
    const bodyHTML = renderToStaticMarkup(
      <ErrorPage
        {...(json[code])}
        code={code}
        img={images[i]}
        copy={copySVG}
        cc={ccSVG}
      />
    );
    const metaHTML = DocumentMeta.renderAsHTML();
    const cleanCSS = purify(bodyHTML, rawCSS, { minify: true });
    const finalHTML = htmlMinifier.minify(
      baseHTML
      .replace('<meta>', metaHTML)
      .replace('<app>', bodyHTML)
      .replace('[object Object]', '')
      .replace('html{}', cleanCSS), {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      }
    );

    fs.writeFileSync(path.join(__dirname, `../public/${code}.html`), finalHTML, 'utf8');
  });
  console.log(`${colors.green('SUCCESS')}: Custom Error Pages created.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to create Custom Error Pages.`);
}
