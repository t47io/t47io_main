import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import shell from 'shelljs';

import {
  ROOT_PATH,
  GZIP_FILE_TYPES,
} from '../config.js';

const SCRIPT = 'process:clean';


try {
  const tmpFiles = [
    ...glob.sync(path.join(ROOT_PATH, `public/**/*.{${GZIP_FILE_TYPES.filter(type => (type !== 'mp3')).join(',')}}`)),
    ...glob.sync(path.join(ROOT_PATH, 'public/**/*.map.*')),
    ...glob.sync(path.join(ROOT_PATH, 'public/**/e.*.min.js.*')),
    ...glob.sync(path.join(ROOT_PATH, 'public/error.*')),
  ];
  tmpFiles.forEach(file => fs.removeSync(file));

  shell.cd(ROOT_PATH);
  shell.rm('-rf', 'public/tmp');
  shell.exec('find . -name ".DS_Store" -type f -delete');
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Build temporary files deleted.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to delete Build temporary files.`);
  process.exit(1);
}
