import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import shell from 'shelljs';

import {
  ROOT,
  PATH,
} from '../../server/env.js';
import { GZIP_FILE_TYPES } from '../config.js';

const SCRIPT = 'process:clean';


try {
  const tmpFiles = [
    ...glob.sync(path.join(PATH.PUBLIC, `**/*.{${GZIP_FILE_TYPES.join(',')}}`)),
    ...glob.sync(path.join(PATH.PUBLIC, '**/*.map.*')),
    ...glob.sync(path.join(PATH.PUBLIC, '**/e.*.min.js.*')),
    ...glob.sync(path.join(PATH.PUBLIC, 'error.*')),
  ];
  tmpFiles.forEach(file => fs.removeSync(file));

  shell.cd(ROOT);
  shell.rm('-rf', 'public/tmp');
  shell.exec('find . -name ".DS_Store" -type f -delete');
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Build temporary files deleted.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to delete Build temporary files.`);
  process.exit(1);
}
