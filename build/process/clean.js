import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import shell from 'shelljs';

import { ROOT_PATH } from '../config.js';

const SCRIPT = 'process:clean';


try {
  const tmpFiles = [
    ...glob.sync(path.join(ROOT_PATH, 'public/*.map')),
    ...glob.sync(path.join(ROOT_PATH, 'public/*.js')),
    ...glob.sync(path.join(ROOT_PATH, 'public/*.html')),
    ...glob.sync(path.join(ROOT_PATH, 'public/e.*.min.js.br')),
  ];
  tmpFiles.forEach(file => fs.removeSync(file));

  shell.cd(ROOT_PATH);
  shell.exec('find . -name ".DS_Store" -type f -delete');
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Build temporary files deleted.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to delete Build temporary files.`);
  process.exit(1);
}
