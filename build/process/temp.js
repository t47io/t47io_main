import colors from 'colors';
import path from 'path';
import purify from 'purify-css';

import {
  loadFile,
  saveFile,
  renderSass,
  replaceBgRNA,
} from '../render/util.js';
import logger from '../../server/logger.js';

const log = logger('process:temp');


const processTempCss = async (inputHTML, inputCSS) => {
  const tag = inputHTML.split('.')[0].replace('_h', 'H');
  log.debug(`Creating temp CSS (${colors.blue(`<${tag} />`)})...`);

  const contentHTML = await loadFile(path.join('public/tmp/', inputHTML));
  const contentSASS = await renderSass(path.join('applications/', inputCSS));
  const contentCSS = purify(contentHTML, contentSASS, { minify: true });
  const finalCSS = await replaceBgRNA(contentCSS);

  const outputCSS = inputHTML.replace('.html', '.css');
  await saveFile(path.join('public/tmp/', outputCSS), finalCSS);
  log.debug(`Temp CSS (${colors.blue(`<${tag} />`)}) created.`);
};

(async () => {
  try {
    await Promise.all([
      processTempCss('_helix.html', 'loading/stylesheets/main.scss'),
      processTempCss('_hexagon.html', 'loading/stylesheets/project.scss'),
    ]);
    log.info('Temp CSS finished.');
  } catch (err) {
    console.error(err);
    log.error('Failed to create Temp CSS.');
    process.exit(1);
  }
})();
