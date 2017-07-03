import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';

import { ROOT_PATH } from '../config.js';
import { FILE_NAMES } from '../../server/config.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';


try {
  const staticFiles = glob.sync(path.join(ROOT_PATH, 'static/*'))
    .map(file => path.basename(file));
  staticFiles.forEach(file => (
    fs.copySync(
      path.join(ROOT_PATH, `static/${file}`),
      path.join(ROOT_PATH, `public/${file}`)
    )
  ));

  const robotsTXT = loadFileSync(`static/${FILE_NAMES.ROBOTS}`);
  saveFileSync(`public/${FILE_NAMES.ROBOTS}`, robotsTXT);
  console.log(`${colors.green('SUCCESS')}: Static files copied to public.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to copy static files to public.`);
}
