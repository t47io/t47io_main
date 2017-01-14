import React from 'react';
import {renderToString} from 'react-dom/server';
import fs from 'fs';
import path from 'path';
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
  201: 'Created'
};

const loadFileSync = (filename) => fs.readFileSync(path.join(__dirname, filename), 'utf8');


const baseHTML = loadFileSync('../public/error.html');
const logoAltSVG = loadFileSync('../app/common/img/t47_logo_alt.svg');
const copySVG = loadFileSync('../app/error/img/copyright.svg');
const ccSVG = loadFileSync('../app/error/img/creative-commons.svg');
const footerHTML = renderToString(<Footer logo={logoAltSVG} copy={copySVG} cc={ccSVG} />);
const CSS = sass.renderSync({
  file: path.join(__dirname, '../app/error/error.scss'),
  outputStyle: 'compressed'
}).css.toString();


[400, 401, 403, 404, 405, 500, 502, 503, 201].map((code) => {
  const Component = Components[codes[code]];
  let bodyHTML = `${renderToString(<Component />).slice(0, -6)}<hr/>${footerHTML}</div>`;
  let HTML = baseHTML.replace("<div class=\"body\" id=\"app\"></div>", bodyHTML).replace("html{}", CSS);

  fs.writeFileSync(path.join(__dirname, `../public/${code}.html`), HTML, 'utf8');
});
