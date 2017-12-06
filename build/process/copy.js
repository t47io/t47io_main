import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import shell from 'shelljs';

import { PATH } from '../../server/env.js';
import { FILE_NAMES } from '../../server/config.js';
import { resumeVersion } from '../../server/util.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';

const SCRIPT = 'process:copy';


const copyImages = () => {
  const staticFiles = glob.sync(path.join(PATH.STATIC, '*'), { nodir: true })
    .map(file => path.basename(file));

  staticFiles.forEach(file => (
    fs.copySync(
      path.join(PATH.STATIC, file),
      path.join(PATH.PUBLIC, file)
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
  const staticFiles = glob.sync(path.join(PATH.STATIC, 'pubs/*.pdf'))
    .map(file => path.basename(file));
  staticFiles.forEach(file => (
    fs.copySync(
      path.join(PATH.STATIC, `pubs/${file}`),
      path.join(PATH.PUBLIC, `docs/${file}`)
    )
  ));
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Pubs PDF files copied to public.`);
};

const copyResume = () => {
  fs.copySync(
    path.join(PATH.STAIC, `resume/${resumeVersion}.pdf`),
    path.join(PATH.PUBLIC, 'docs/resume.pdf')
  );
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Resume PDF ${colors.blue(resumeVersion)} copied to public.`);
};

const copyThesis = () => {
  const staticFiles = glob.sync(path.join(PATH.STATIC, 'thesis/*'))
    .map(file => path.basename(file));
  staticFiles.forEach(file => (
    fs.copySync(
      path.join(PATH.STATIC, `thesis/${file}`),
      path.join(PATH.PUBLIC, `docs/${file}`)
    )
  ));
  console.log(`${colors.magenta(`[${SCRIPT}]`)} Thesis PDF files copied to public.`);
};


try {
  copyImages();
  copyRobots();

  shell.mkdir('-p', path.join(PATH.PUBLIC, 'docs/'));
  copyPubs();
  copyThesis();
  copyResume();

  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Static files copied to public.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to copy static files to public.`);
  process.exit(1);
}
