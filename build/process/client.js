import colors from 'colors';

import {
  renderMainHTML,
  renderProjectHTML,
} from '../render/client.jsx';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';


try {
  const baseHTML = loadFileSync('public/main.html');
  const finalHTML = renderMainHTML(baseHTML);

  saveFileSync('public/main.html', finalHTML);
  console.log(`${colors.green('SUCCESS')}: Index Page DOM/JS/CSS inlined.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to inline DOM/JS/CSS on Index Page.`);
}

try {
  const baseHTML = loadFileSync('public/project.html');
  const finalHTML = renderProjectHTML(baseHTML);

  saveFileSync('public/project.html', finalHTML);
  console.log(`${colors.green('SUCCESS')}: Index Page DOM/JS/CSS inlined.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to inline DOM/JS/CSS on Index Page.`);
}
