import colors from 'colors';
import fs from 'fs-extra';
import path from 'path';
import shell from 'shelljs';

import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';
import { MANIFEST_JS } from '../render/config.js';

let chunkManifest;

try {
  fs.moveSync(
    path.join(__dirname, '../../', 'public/manifest.json'),
    path.join(__dirname, '../../', 'config/manifest.json'),
    { overwrite: true }
  );
  const manifest = JSON.parse(loadFileSync('config/manifest.json'));

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
  shell.exec(`gzip -df ${path.join(__dirname, '../../public', `${MANIFEST_JS}.gz`)}`);

  const manifestJs = loadFileSync(`public/${MANIFEST_JS}`);
  const fullManifestJs = `window.manifest=${JSON.stringify(chunkManifest)};${manifestJs}`;

  saveFileSync(`public/${MANIFEST_JS}`, fullManifestJs);
  fs.writeJsonSync(path.join(__dirname, '../../config/manifest.json'), chunkManifest);
  console.log(`${colors.green('SUCCESS')}: Manifest JSON injected.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to inject Manifest JSON.`);
}
