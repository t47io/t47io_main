import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import shell from 'shelljs';

import { ROOT_PATH } from '../config.js';
import { FILE_NAMES } from '../../server/config.js';
import { resumeVersion } from '../../server/util.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';

const SCRIPT = 'process:copy';


const copyImages = () => {
  const staticFiles = glob.sync(path.join(ROOT_PATH, 'static/*'), { nodir: true })
    .map(file => path.basename(file));

  staticFiles.forEach(file => (
    fs.copySync(
      path.join(ROOT_PATH, `static/${file}`),
      path.join(ROOT_PATH, `public/${file}`)
    )
  ));
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Image files copied to public.`);
};

const copyRobots = () => {
  const robotsTXT = loadFileSync(`static/${FILE_NAMES.ROBOTS}`);
  saveFileSync(`public/${FILE_NAMES.ROBOTS}`, robotsTXT);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Robots.txt copied to public.`);
};

const copyPubs = () => {
  shell.mkdir('-p', `${ROOT_PATH}/public/pdf/pubs/`);

  const staticFiles = glob.sync(path.join(ROOT_PATH, 'static/pubs/*.pdf'))
    .map(file => path.basename(file));
  staticFiles.forEach(file => (
    fs.copySync(
      path.join(ROOT_PATH, `static/pubs/${file}`),
      path.join(ROOT_PATH, `public/pdf/pubs/${file}`)
    )
  ));
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Pubs PDF files copied to public.`);
};

const copyResume = () => {
  fs.copySync(
    path.join(ROOT_PATH, `static/resume/${resumeVersion}.pdf`),
    path.join(ROOT_PATH, 'public/pdf/resume.pdf')
  );
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Resume PDF ${colors.blue(resumeVersion)} copied to public.`);
};

const copyThesis = () => {
  shell.mkdir('-p', `${ROOT_PATH}/public/pdf/thesis/`);

  const staticFiles = glob.sync(path.join(ROOT_PATH, 'static/thesis/*'))
    .map(file => path.basename(file));
  staticFiles.forEach(file => (
    fs.copySync(
      path.join(ROOT_PATH, `static/thesis/${file}`),
      path.join(ROOT_PATH, `public/pdf/thesis/${file}`)
    )
  ));
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Thesis PDF files copied to public.`);
};


try {
  copyImages();
  copyRobots();

  copyPubs();
  copyThesis();
  copyResume();

  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Static files copied to public.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to copy static files to public.`);
  process.exit(1);
}
