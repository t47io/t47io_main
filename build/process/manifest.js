import colors from 'colors';
import fs from 'fs-extra';
import path from 'path';
import shell from 'shelljs';

import {
  MANIFEST_JS,
  ROOT_PATH,
} from '../config.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';

const SCRIPT = 'process:manifest';
let chunkManifest;

try {
  fs.moveSync(
    path.join(ROOT_PATH, 'public/manifest.json'),
    path.join(ROOT_PATH, 'config/manifest.json'),
    { overwrite: true }
  );
  const manifest = JSON.parse(loadFileSync('config/manifest.json'));

  const chunkKeys = Object.keys(manifest).filter(key => key.includes('.js'));
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
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Manifest JSON parsed.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to parse Manifest JSON.`);
  process.exit();
}

try {
  shell.exec(`gzip -df ${path.join(ROOT_PATH, `public/${MANIFEST_JS}.gz`)}`);

  const manifestJs = loadFileSync(`public/${MANIFEST_JS}`);
  const fullManifestJs = `window.manifest=${JSON.stringify(chunkManifest)};${manifestJs}`;

  saveFileSync(`public/${MANIFEST_JS}`, fullManifestJs);
  fs.writeJSONSync(path.join(ROOT_PATH, 'config/manifest.json'), chunkManifest);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Manifest JSON injected.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to inject Manifest JSON.`);
}
