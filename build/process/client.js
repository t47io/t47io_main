import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

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

try {
  const tmpFiles = [
    ...glob.sync(path.join(__dirname, '../../', 'public/*.map')),
    ...glob.sync(path.join(__dirname, '../../', 'public/*.js')),
    ...glob.sync(path.join(__dirname, '../../', 'public/*.html')),
  ];
  tmpFiles.forEach(file => fs.removeSync(file));
  console.log(`${colors.green('SUCCESS')}: Build temporary files deleted.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to delete Build temporary files.`);
}

try {
  const staticFiles = glob.sync(path.join(__dirname, '../../', 'static/*'))
    .map(file => path.basename(file));
  staticFiles.forEach(file => (
    fs.copySync(
      path.join(__dirname, '../../', `static/${file}`),
      path.join(__dirname, '../../', `public/${file}`)
    )
  ));
  console.log(`${colors.green('SUCCESS')}: Public files copied.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to copy Public files.`);
}
