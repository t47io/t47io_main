import colors from 'colors';

import {
  renderMainHTML,
  renderProjectHTML,
} from '../render/client.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';

const SCRIPT = 'process:client';


try {
  const baseHTML = loadFileSync('public/main.html');
  const finalHTML = renderMainHTML(baseHTML);

  saveFileSync('public/main.html', finalHTML);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Main Page DOM/JS/CSS inlined.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to inline DOM/JS/CSS on Main Page.`);
  process.exit(1);
}

try {
  const baseHTML = loadFileSync('public/project.html');
  const finalHTML = renderProjectHTML(baseHTML);

  saveFileSync('public/project.html', finalHTML);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Project Page DOM/JS/CSS inlined.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to inline DOM/JS/CSS on Project Page.`);
  process.exit(1);
}
