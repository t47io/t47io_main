import colors from 'colors';
import path from 'path';
import purify from 'purify-css';

import {
  loadFileSync,
  saveFileSync,
  renderSassSync,
  replaceBgRNA,
} from '../render/util.js';

const SCRIPT = 'process:temp';


const processTempCSS = (inputHTML, inputCSS, outputCSS, tag) => {
  const contentHTML = loadFileSync(path.join('public/tmp/', inputHTML));
  const contentCSS = replaceBgRNA(purify(
    contentHTML,
    renderSassSync(path.join('applications/', inputCSS)),
    { minify: true }
  ));
  saveFileSync(path.join('public/tmp/', outputCSS), contentCSS);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Temp CSS (${colors.blue(`<${tag} />`)}) created.`);
};

try {
  processTempCSS('_helix.html', 'loading/stylesheets/main.scss', '_helix.css', 'Helix');
  processTempCSS('_hexagon.html', 'loading/stylesheets/project.scss', '_hexagon.css', 'Hexagon');
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Temp CSS finished.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to create Temp CSS.`);
  process.exit(1);
}
