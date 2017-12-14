import colors from 'colors';
import path from 'path';
import purify from 'purify-css';

import {
  loadFileSync,
  saveFileSync,
  renderSassSync,
  replaceBgRNA,
} from '../render/util.js';
import { logger } from '../../server/util.js';

const log = logger('process:temp');


const processTempCSS = (inputHTML, inputCSS, outputCSS, tag) => {
  const contentHTML = loadFileSync(path.join('public/tmp/', inputHTML));
  const contentCSS = replaceBgRNA(purify(
    contentHTML,
    renderSassSync(path.join('applications/', inputCSS)),
    { minify: true }
  ));
  saveFileSync(path.join('public/tmp/', outputCSS), contentCSS);
  log.info(`Temp CSS (${colors.blue(`<${tag} />`)}) created.`);
};

try {
  processTempCSS('_helix.html', 'loading/stylesheets/main.scss', '_helix.css', 'Helix');
  processTempCSS('_hexagon.html', 'loading/stylesheets/project.scss', '_hexagon.css', 'Hexagon');
  log.success('Temp CSS finished.');
} catch (err) {
  console.error(err);
  log.error('Failed to create Temp CSS.');
  process.exit(1);
}
