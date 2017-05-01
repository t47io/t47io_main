import colors from 'colors';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ErrorPage from '../applications/error/containers/ErrorPage.jsx';

import {
  renderMainHTML,
  renderProjectHTML,
  renderErrorHTML,
} from './render/render.jsx';
import {
  loadFileSync,
  saveFileSync,
  renderSassSync,
  loadImageSync,
} from './render/util.js';

const json = require('../config/error.json');


try {
  const baseHTML = loadFileSync('public/main.html');
  const finalHTML = renderMainHTML(baseHTML);

  saveFileSync('public/main.html', finalHTML);
  console.log(`${colors.green('SUCCESS')}: Index Page DOM/JS/CSS inlined.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to inline DOM/JS/CSS on Index Page.`);
}


try {
  const baseHTML = loadFileSync('public/project.html');
  const finalHTML = renderProjectHTML(baseHTML);

  saveFileSync('public/project.html', finalHTML);
  console.log(`${colors.green('SUCCESS')}: Index Page DOM/JS/CSS inlined.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to inline DOM/JS/CSS on Index Page.`);
}


const codes = Object.keys(json).map(code => parseInt(code, 10));
const images = codes.map(code => loadImageSync(`applications/error/images/${code}.png`));

try {
  const baseHTML = loadFileSync('public/error.html');
  const copySVG = loadFileSync('applications/error/images/copyright.svg');
  const ccSVG = loadFileSync('applications/error/images/creative-commons.svg');
  const rawCSS = renderSassSync('applications/error/stylesheets/index.scss');

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
    const finalHTML = renderErrorHTML(baseHTML, bodyHTML, rawCSS);

    saveFileSync(`public/${code}.html`, finalHTML);
  });
  console.log(`${colors.green('SUCCESS')}: Custom Error Pages created.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to create Custom Error Pages.`);
}
