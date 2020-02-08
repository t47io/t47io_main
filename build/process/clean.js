import colors from 'colors';
import path from 'path';

import {
  ROOT,
  PATH,
} from '../../server/env.js';
import { GZIP_FILE_TYPES } from '../config.js';
import {
  exec,
  glob,
} from '../../server/util.js';
import logger from '../../server/logger.js';

const log = logger('process:clean');


(async () => {
  try {
    const globFiles = await Promise.all([
      glob(path.join(PATH.PUBLIC, `**/*.{${GZIP_FILE_TYPES.join(',')}}`)),
      glob(path.join(PATH.PUBLIC, '**/*.map.*')),
      glob(path.join(PATH.PUBLIC, '**/e.*.min.js.*')),
      glob(path.join(PATH.PUBLIC, 'error.*')),
      glob(path.join(PATH.PUBLIC, 'ssr.*')),
      glob(path.join(PATH.PUBLIC, '**/*.json')),
      glob(path.join(PATH.PUBLIC, 'tmp/*')),
      glob(path.join(PATH.CONFIG, '{manifest|config}.json')),
      glob(path.join(ROOT, '**/.DS_Store')),
    ]);
    const tmpFiles = Array.from(new Set(globFiles.flat()));

    await Promise.all([
      exec(`rm -rf ${tmpFiles.join(' ')}`),
      exec(`rm -rf ${path.join(PATH.PUBLIC, 'tmp')}`),
    ]);
    log.info(`Build temporary files (${colors.red(tmpFiles.length)}) deleted.`);
  } catch (err) {
    console.error(err);
    log.error('Failed to delete Build temporary files.');
    process.exit(1);
  }
})();
