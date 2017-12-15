import fs from 'fs-extra';
import path from 'path';
import shell from 'shelljs';

import { PATH } from '../../server/env.js';
import { MANIFEST_JS } from '../config.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';
import logger from '../../server/logger.js';

const log = logger('process:manifest');


let chunkManifest;

try {
  fs.moveSync(
    path.join(PATH.PUBLIC, 'manifest.json'),
    path.join(PATH.CONFIG, 'manifest.json'),
    { overwrite: true }
  );
  const manifest = JSON.parse(loadFileSync('config/manifest.json'));

  const chunkKeys = Object.keys(manifest).filter(key => key.includes('.js'));
  chunkManifest = chunkKeys.map((key) => {
    const chunk = key.replace('.js', '');
    return {
      [chunk]: manifest[key].replace(`${chunk}.`, '').replace('scripts/', '').replace('.min.js', ''),
    };
  })
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
  log.debug('Manifest JSON parsed.');
} catch (err) {
  console.error(err);
  log.error('Failed to parse Manifest JSON.');
  process.exit(1);
}

try {
  shell.exec(`gzip -df ${path.join(PATH.PUBLIC, `${MANIFEST_JS}.gz`)}`);

  const manifestJs = loadFileSync(`public/${MANIFEST_JS}`);
  const fullManifestJs = `window.manifest=${JSON.stringify(chunkManifest)};${manifestJs}`;

  saveFileSync(`public/${MANIFEST_JS}`, fullManifestJs);
  fs.writeJSONSync(path.join(PATH.CONFIG, 'manifest.json'), chunkManifest);
  log.info('Manifest JSON injected.');
} catch (err) {
  console.error(err);
  log.error('Failed to inject Manifest JSON.');
  process.exit(1);
}
