import colors from 'colors';
import fs from 'fs-extra';
import path from 'path';
import shell from 'shelljs';

import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';

const manifest = require('../../public/manifest.json');

const MANIFEST_JS_FILE_NAME = 'f.012345.min.js';
let chunkManifest;

try {
  const chunkKeys = Object.keys(manifest).filter(key => key.indexOf('.js') !== -1);
  chunkManifest = chunkKeys.map((key) => {
    const chunk = key.replace('.js', '');
    return {
      [chunk]: manifest[key].replace(`${chunk}.`, '').replace('.min.js', ''),
    };
  })
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {});
  console.log(`${colors.green('SUCCESS')}: Manifest JSON parsed.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to parse Manifest JSON.`);
}

try {
  shell.exec(`gzip -df ${path.join(__dirname, '../../public', `${MANIFEST_JS_FILE_NAME}.gz`)}`);

  const manifestJs = loadFileSync(`public/${MANIFEST_JS_FILE_NAME}`);
  const fullManifestJs = `window.manifest=${JSON.stringify(chunkManifest)};${manifestJs}`;

  saveFileSync(`public/${MANIFEST_JS_FILE_NAME}`, fullManifestJs);
  fs.removeSync(path.join(__dirname, '../../', 'public/manifest.json'));
  console.log(`${colors.green('SUCCESS')}: Manifest JSON injected.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to inject Manifest JSON.`);
}
