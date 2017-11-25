import colors from 'colors';
import purify from 'purify-css';

import { renderErrorHTML } from '../render/client.jsx';
import {
  loadFileSync,
  saveFileSync,
  renderSassSync,
} from '../render/util.js';

import errorJSON from '../../config/error.json';

const SCRIPT = 'process:error';


const codes = Object.keys(errorJSON).map(code => parseInt(code, 10));

const processErrorHTML = (code, baseHTML, rawCSS, bodyMETA) => {
  const bodyHTML = loadFileSync(`public/tmp/_err${code}.html`);
  const bodyCSS = purify(bodyHTML, rawCSS, { minify: true });
  const finalHTML = renderErrorHTML(baseHTML, bodyHTML, bodyMETA, bodyCSS);

  saveFileSync(`public/e.${code}.html`, finalHTML);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Custom ${colors.blue(code)} Error Page created.`);
};

try {
  const baseHTML = loadFileSync('applications/error/error.html');
  const bodyMETA = loadFileSync('public/tmp/_errorMeta.html');
  const rawCSS = renderSassSync('applications/error/stylesheets/index.scss');

  codes.map(code => processErrorHTML(code, baseHTML, rawCSS, bodyMETA));
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Custom Error Pages created.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to create Custom Error Pages.`);
  process.exit(1);
}
