import colors from 'colors';
import path from 'path';
import purify from 'purify-css';

import {
  loadFileSync,
  saveFileSync,
  renderSassSync,
} from '../render/util.js';

const SCRIPT = 'process:temp';


const processTempCSS = (inputHTML, inputCSS, outputCSS, tag) => (
  new Promise((resolve, reject) => {
    try {
      const contentHTML = loadFileSync(path.join('public/tmp/', inputHTML));
      const contentCSS = purify(
        contentHTML,
        renderSassSync(path.join('applications/', inputCSS)),
        { minify: true }
      );
      saveFileSync(path.join('public/tmp/', outputCSS), contentCSS);
      console.log(`${colors.magenta(`[${SCRIPT}]`)} Temp CSS (${colors.blue(`<${tag} />`)}) created.`);
    } catch (err) {
      reject(err);
    }
    resolve(0);
  })
);

try {
  Promise.all([
    processTempCSS('_helix.html', 'loading/stylesheets/main.scss', '_helix.css', 'Helix'),
    processTempCSS('_hexagon.html', 'loading/stylesheets/project.scss', '_hexagon.css', 'Hexagon'),
  ])
  .then(() => {
    console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Temp CSS finished.`);
  })
  .catch((err) => { throw err; });
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to create Temp CSS.`);
  process.exit(1);
}
