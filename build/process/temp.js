import colors from 'colors';
import path from 'path';
import purify from 'purify-css';

import {
  loadFile,
  loadFileSync,
  saveFile,
  saveFileSync,
  renderSass,
  renderSassSync,
  replaceBgRNA,
} from '../render/util.js';
import logger from '../../server/logger.js';

const log = logger('process:temp');


const processTempCss = async (inputHTML, inputCSS, outputCSS) => {
  const contentHTML = await loadFile(path.join('public/tmp/', inputHTML));
  const contentSASS = await renderSass(path.join('applications/', inputCSS));
  const contentCSS = purify(contentHTML, contentSASS, { minify: true });
  const finalCSS = await replaceBgRNA(contentCSS);
  await saveFile(path.join('public/tmp/', outputCSS), finalCSS);
  const tag = inputHTML.split('.')[0].replace('_h', 'H');
  log.debug(`Temp CSS (${colors.blue(`<${tag} />`)}) created.`);
};

(async () => {
  try {
    await processTempCss('_helix.html', 'loading/stylesheets/main.scss', '_helix.css');
    await processTempCss('_hexagon.html', 'loading/stylesheets/project.scss', '_hexagon.css');
    log.info('Temp CSS finished.');
  } catch (err) {
    console.error(err);
    log.error('Failed to create Temp CSS.');
    process.exit(1);
  }
})();
