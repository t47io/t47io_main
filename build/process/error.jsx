import colors from 'colors';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ErrorPage from '../../applications/error/containers/ErrorPage.jsx';

import { renderErrorHTML } from '../render/client.jsx';
import {
  loadFileSync,
  saveFileSync,
  renderSassSync,
  loadImageSync,
} from '../render/util.js';

import errorJSON from '../../config/error.json';

const SCRIPT = 'process:error';


const codes = Object.keys(errorJSON).map(code => parseInt(code, 10));
const images = codes.map(code => loadImageSync(`applications/error/images/${code}.png`));

try {
  const baseHTML = loadFileSync('public/error.html');
  const copySVG = loadFileSync('applications/error/images/copyright.svg');
  const ccSVG = loadFileSync('applications/error/images/creative-commons.svg');
  const rawCSS = renderSassSync('applications/error/stylesheets/index.scss');

  codes.forEach((code, i) => {
    const bodyHTML = renderToStaticMarkup(
      <ErrorPage
        {...(errorJSON[code])}
        code={code}
        img={images[i]}
        copy={copySVG}
        cc={ccSVG}
      />
    );
    const finalHTML = renderErrorHTML(baseHTML, bodyHTML, rawCSS);

    saveFileSync(`public/e.${code}.html`, finalHTML);
    console.log(`${colors.magenta(`[${SCRIPT}]`)} Custom ${colors.blue(code)} Error Page created.`);
  });
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Custom Error Pages created.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to create Custom Error Pages.`);
  process.exit(1);
}
