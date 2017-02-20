import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import colors from 'colors';
import fs from 'fs';
import htmlMinifier from 'html-minifier';
import path from 'path';
import purify from 'purify-css';
import sass from 'node-sass';

import Components from '../app/error/jsx/pages.jsx';
import Footer from '../app/error/jsx/footer.jsx';


const codes = {
  400: 'BadRequest',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'NotFound',
  405: 'MethodNotAllowed',
  500: 'InternalServerError',
  502: 'BadGateway',
  503: 'ServiceUnavailable',
  201: 'Created',
};

const loadFileSync = filename => fs.readFileSync(path.join(__dirname, filename), 'utf8');

try {
  const baseHTML = loadFileSync('../public/error.html');
  const logoAltSVG = loadFileSync('../app/common/img/t47_logo_alt.svg');
  const copySVG = loadFileSync('../app/error/img/copyright.svg');
  const ccSVG = loadFileSync('../app/error/img/creative-commons.svg');
  const footerHTML = renderToStaticMarkup(<Footer logo={logoAltSVG} copy={copySVG} cc={ccSVG} />);
  const rawCSS = sass.renderSync({
    file: path.join(__dirname, '../app/error/error.scss'),
  }).css.toString();


  Object.keys(codes).forEach((code) => {
    const Component = Components[codes[code]];
    const bodyHTML = `${renderToStaticMarkup(<Component />).slice(0, -6)}<hr/>${footerHTML}</div>`;
    const cleanCSS = purify(bodyHTML, rawCSS, { minify: true });
    const finalHTML = htmlMinifier.minify(
      baseHTML.replace('<div class="body" id="app"></div>', bodyHTML).replace('html{}', cleanCSS), {
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

