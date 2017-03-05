import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import colors from 'colors';
import fs from 'fs';
import htmlMinifier from 'html-minifier';
import path from 'path';
import purify from 'purify-css';
import sass from 'node-sass';

import Components from '../app/error/containers/Pages.jsx';
import Footer from '../app/error/components/Footer.jsx';


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
  const logoAltSVG = loadFileSync('../app/common/images/t47_logo_alt.svg');
  const copySVG = loadFileSync('../app/error/images/copyright.svg');
  const ccSVG = loadFileSync('../app/error/images/creative-commons.svg');
  const footerHTML = renderToStaticMarkup(<Footer logo={logoAltSVG} copy={copySVG} cc={ccSVG} />);
  const rawCSS = ['Error.scss', 'Footer.scss'].map(file => (
    sass.renderSync({
      file: path.join(__dirname, '../app/error/stylesheets/', file),
    }).css.toString()
  )).join();


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

