import path from 'path';

import { PATH } from '../../server/env.js';
import { CHUNKS } from '../chunks.js';
import { MANIFEST_JS } from '../config.js';
import {
  loadFile,
  saveFile,
} from '../render/util.js';
import {
  exec,
  writeJsonFile,
} from '../../server/util.js';
import logger from '../../server/logger.js';

import cronJSON from '../../config/cron.json';
// eslint-disable-next-line import/no-unresolved
import manifestJSON from '../../public/manifest.json';

const log = logger('process:manifest');


const parseChunks = (manifest, isCSS = false) => {
  const ext = isCSS ? '.css' : '.js';
  return Object.fromEntries(
    Object.keys(manifest)
    .filter(key => key.endsWith(ext))
    .map(key => ([
      CHUNKS[key.replace(ext, '')][0],
      manifest[key],
    ]))
  );
};

let chunkManifest;


(async () => {
  try {
    chunkManifest = {
      js: parseChunks(manifestJSON, false),
      css: parseChunks(manifestJSON, true),
    };
    log.debug('Manifest JSON parsed.');
  } catch (err) {
    console.error(err);
    log.error('Failed to parse Manifest JSON.');
    process.exit(1);
  }

  try {
    await exec(`gzip -df ${path.join(PATH.PUBLIC, `${MANIFEST_JS}.gz`)}`);

    const manifestJS = await loadFile(path.join('public/', MANIFEST_JS));
    const fullManifestJS = `window.manifest=${JSON.stringify(chunkManifest)};${manifestJS}`;

    await saveFile(path.join('public/', MANIFEST_JS), fullManifestJS);
    const newCronJSON = {
      ...cronJSON,
      manifest: Object.fromEntries(
        Object.keys(CHUNKS).map(key => ([
          key,
          Object.values(chunkManifest).map(type => type[CHUNKS[key]]).filter(Boolean),
        ]))
      ),
    };
    await writeJsonFile('cron.json', newCronJSON);
    log.info('Manifest JSON injected.');
  } catch (err) {
    console.error(err);
    log.error('Failed to inject Manifest JSON.');
    process.exit(1);
  }
})();
