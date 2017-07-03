import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

import { ROOT_PATH } from '../config.js';


try {
  const tmpFiles = [
    ...glob.sync(path.join(ROOT_PATH, 'public/*.map')),
    ...glob.sync(path.join(ROOT_PATH, 'public/*.js')),
    ...glob.sync(path.join(ROOT_PATH, 'public/*.html')),
    ...glob.sync(path.join(ROOT_PATH, 'public/e.*.min.js.br')),
  ];
  tmpFiles.forEach(file => fs.removeSync(file));
  console.log(`${colors.green('SUCCESS')}: Build temporary files deleted.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to delete Build temporary files.`);
}
