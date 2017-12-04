import colors from 'colors';
import path from 'path';
import purify from 'purify-css';

import {
  loadFileSync,
  saveFileSync,
  renderSassSync,
  loadImageSync,
} from '../render/util.js';

const SCRIPT = 'process:temp';


const rnaSVG = loadImageSync('applications/loading/images/bg_rna.svg');

const processTempCSS = (inputHTML, inputCSS, outputCSS, tag) => {
  const contentHTML = loadFileSync(path.join('public/tmp/', inputHTML));
  const contentCSS = purify(
    contentHTML,
    renderSassSync(path.join('applications/', inputCSS)),
    { minify: true }
  )
  .replace('../images/bg_rna.svg', rnaSVG);
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
