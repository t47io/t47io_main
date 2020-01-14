import fs from 'fs-extra';
import path from 'path';
import shell from 'shelljs';

import { PATH } from '../../server/env.js';
import { CHUNKS } from '../chunks.js';
import { MANIFEST_JS } from '../config.js';
import { JSON_FORMAT } from '../../server/config.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';
import logger from '../../server/logger.js';

import cronJSON from '../../config/cron.json';

const log = logger('process:manifest');


const parseChunks = (manifest, isCSS = false) => {
  const ext = isCSS ? '.css' : '.js';
  const chunkKeys = Object.keys(manifest).filter(key => key.endsWith(ext));
  return chunkKeys.map((key) => {
    const chunk = CHUNKS[key.replace(ext, '')][0];
    return { [chunk]: manifest[key] };
  })
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
};

let chunkManifest;

try {
  const manifest = JSON.parse(loadFileSync('public/manifest.json'));
  chunkManifest = {
    js: parseChunks(manifest, false),
    css: parseChunks(manifest, true),
  };
  log.debug('Manifest JSON parsed.');
} catch (err) {
  console.error(err);
  log.error('Failed to parse Manifest JSON.');
  process.exit(1);
}

try {
  shell.exec(`gzip -df ${path.join(PATH.PUBLIC, `${MANIFEST_JS}.gz`)}`);

  const manifestJS = loadFileSync(`public/${MANIFEST_JS}`);
  const fullManifestJs = `window.manifest=${JSON.stringify(chunkManifest)};${manifestJS}`;

  saveFileSync(`public/${MANIFEST_JS}`, fullManifestJs);
  const newCronJSON = {
    ...cronJSON,
    manifest: Object.keys(CHUNKS).map(key => ({
      [key]: Object.values(chunkManifest).map(type => type[CHUNKS[key]]).filter(Boolean)
    }))
    .reduce((obj, item) => ({
      ...obj,
      ...item,
    }), {})
  };
  fs.writeJSONSync(path.join(PATH.CONFIG, 'cron.json'), newCronJSON, JSON_FORMAT);
  log.info('Manifest JSON injected.');
} catch (err) {
  console.error(err);
  log.error('Failed to inject Manifest JSON.');
  process.exit(1);
}
