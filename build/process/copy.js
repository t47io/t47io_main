import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import shell from 'shelljs';

import { ROOT_PATH } from '../config.js';
import { FILE_NAMES } from '../../server/config.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';


const copyImages = () => {
  const staticFiles = glob.sync(path.join(ROOT_PATH, 'static/*'), { nodir: true })
    .map(file => path.basename(file));

  staticFiles.forEach(file => (
    fs.copySync(
      path.join(ROOT_PATH, `static/${file}`),
      path.join(ROOT_PATH, `public/${file}`)
    )
  ));
  console.log(`${colors.green('SUCCESS')}: Image files copied to public.`);
};

const copyRobots = () => {
  const robotsTXT = loadFileSync(`static/${FILE_NAMES.ROBOTS}`);
  saveFileSync(`public/${FILE_NAMES.ROBOTS}`, robotsTXT);
  console.log(`${colors.green('SUCCESS')}: Robots.txt copied to public.`);
};

const copyPubs = () => {
  const staticFiles = glob.sync(path.join(ROOT_PATH, 'static/pubs/*.pdf'))
    .map(file => path.basename(file));

  staticFiles.forEach(file => (
    fs.copySync(
      path.join(ROOT_PATH, `static/pubs/${file}`),
      path.join(ROOT_PATH, `public/pdf/${file}`)
    )
  ));
  console.log(`${colors.green('SUCCESS')}: Pubs PDF files copied to public.`);
};

const copyResume = () => {
  const staticFiles = glob.sync(path.join(ROOT_PATH, 'static/resume/*.pdf'))
    .map(file => path.basename(file));

  staticFiles.forEach(file => (
    fs.copySync(
      path.join(ROOT_PATH, `static/resume/${file}`),
      path.join(ROOT_PATH, `public/pdf/Resume_${file}`)
    )
  ));
  console.log(`${colors.green('SUCCESS')}: Resume PDF files copied to public.`);
};

const copyThesis = () => {
  const staticFiles = glob.sync(path.join(ROOT_PATH, 'static/thesis/*'))
    .map(file => path.basename(file));

  staticFiles.forEach(file => (
    fs.copySync(
      path.join(ROOT_PATH, `static/thesis/${file}`),
      path.join(ROOT_PATH, `public/pdf/PhD_${file}`)
    )
  ));
  console.log(`${colors.green('SUCCESS')}: Thesis PDF files copied to public.`);
};


try {
  copyImages();
  copyRobots();

  shell.mkdir('-p', `${ROOT_PATH}/public/pdf`);
  copyPubs();
  copyResume();
  copyThesis();

  console.log(`${colors.green('SUCCESS')}: Static files copied to public.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to copy static files to public.`);
}
