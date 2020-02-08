import colors from 'colors';
import path from 'path';
import purify from 'purify-css';

import { renderErrorHtml } from '../render/client.js';
import {
  loadFile,
  saveFile,
  renderSass,
  replaceBgRNA,
} from '../render/util.js';
import logger from '../../server/logger.js';

import errorJSON from '../../config/error.json';

const log = logger('process:error');


const codes = Object.keys(errorJSON).map(code => parseInt(code, 10));

const processErrorHtml = async (code, baseHTML, rawCSS, bodyMETA) => {
  log.debug(`Creating custom ${colors.blue(code)} Error Page...`);
  const bodyHTML = await loadFile(path.join('public/tmp/', `_err${code}.html`));
  const bodyCSS = await replaceBgRNA(purify(bodyHTML, rawCSS, { minify: true }));
  const finalHTML = renderErrorHtml(baseHTML, bodyHTML, bodyMETA, bodyCSS);

  await saveFile(path.join('public/', `e.${code}.html`), finalHTML);
  log.debug(`Custom ${colors.blue(code)} Error Page created.`);
};

(async () => {
  try {
    log.debug('Loading custom Error Page assets...');
    const baseHTML = await loadFile('applications/error/error.html');
    const bodyMETA = await loadFile('public/tmp/_errorMeta.html');
    const rawCSS = await renderSass('applications/error/stylesheets/index.scss');

    await Promise.all(codes.map(code => processErrorHtml(code, baseHTML, rawCSS, bodyMETA)));
    log.info('Custom Error Pages created.');
  } catch (err) {
    console.error(err);
    log.error('Failed to create Custom Error Pages.');
    process.exit(1);
  }
})();
