import { promises as fs } from 'fs';
import path from 'path';

import {
  ROOT,
  PATH,
} from '../../server/env.js';
import { GZIP_FILE_TYPES } from '../config.js';
import { glob } from '../../server/util.js';
import logger from '../../server/logger.js';

const log = logger('process:clean');


(async () => {
  try {
    await fs.rmdir(path.join(PATH.PUBLIC, 'tmp'), { recursive: true });
    const tmpFiles = await Promise.all([
      glob(path.join(PATH.PUBLIC, `**/*.{${GZIP_FILE_TYPES.join(',')}}`)),
      glob(path.join(PATH.PUBLIC, '**/*.map.*')),
      glob(path.join(PATH.PUBLIC, '**/e.*.min.js.*')),
      glob(path.join(PATH.PUBLIC, 'error.*')),
      glob(path.join(PATH.PUBLIC, 'ssr.*')),
      glob(path.join(PATH.PUBLIC, '**/*.json')),
      glob(path.join(PATH.CONFIG, '{manifest|config}.json')),
      glob(path.join(ROOT, '**/.DS_Store')),
    ]);
    await Promise.all(
      tmpFiles.flat().map(fs.unlink)
    );
    log.info('Build temporary files deleted.');
  } catch (err) {
    console.error(err);
    log.error('Failed to delete Build temporary files.');
    process.exit(1);
  }
})();
