import colors from 'colors';
import fs from 'fs';
import htmlMinifier from 'html-minifier';
import path from 'path';
import purify from 'purify-css';
import sass from 'node-sass';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ErrorPage from '../applications/error/components/Error.jsx';
import Footer from '../applications/error/components/Footer.jsx';

const json = require('../config/error.json');

const codes = [400, 401, 403, 404, 405, 500, 502, 503, 201];
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

  const footerHTML = renderToStaticMarkup(
    <Footer
      copy={copySVG}
      cc={ccSVG}
    />
  );
  const rawCSS = sass.renderSync({
    file: path.join(__dirname, '../applications/error/stylesheets/index.scss'),
  }).css.toString();


  codes.forEach((code, i) => {
    const bodyHTML = `
      ${renderToStaticMarkup(
        <ErrorPage
          code={code}
          img={images[i]}
          {...(json[code])}
        />
      ).slice(0, -6)}
      <hr/>
      ${footerHTML}
      </div>
    `;
    const cleanCSS = purify(bodyHTML, rawCSS, { minify: true });
    const finalHTML = htmlMinifier.minify(
      baseHTML
      .replace('<div class="body" id="app"></div>', bodyHTML)
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
