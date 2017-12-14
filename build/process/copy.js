import colors from 'colors';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import shell from 'shelljs';

import { PATH } from '../../server/env.js';
import { FILE_NAMES } from '../../server/config.js';
import {
  logger,
  resumeVersion,
} from '../../server/util.js';
import {
  loadFileSync,
  saveFileSync,
} from '../render/util.js';

const log = logger('process:copy');


const copyImages = () => {
  const staticFiles = glob.sync(path.join(PATH.STATIC, '*'), { nodir: true })
    .map(file => path.basename(file));

  staticFiles.forEach(file => (
    fs.copySync(
      path.join(PATH.STATIC, file),
      path.join(PATH.PUBLIC, file)
    )
  ));
  log.info('Image files copied to public.');
};

const copyRobots = () => {
  const robotsTXT = loadFileSync(`static/${FILE_NAMES.ROBOTS}`);
  saveFileSync(`public/${FILE_NAMES.ROBOTS}`, robotsTXT);
  log.info('Robots.txt copied to public.');
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
  log.info('Pubs PDF files copied to public.');
};

const copyResume = () => {
  fs.copySync(
    path.join(PATH.STATIC, `resume/${resumeVersion}.pdf`),
    path.join(PATH.PUBLIC, 'docs/resume.pdf')
  );
  log.info(`Resume PDF ${colors.blue(resumeVersion)} copied to public.`);
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
  log.info('Thesis PDF files copied to public.');
};


try {
  copyImages();
  copyRobots();

  shell.mkdir('-p', path.join(PATH.PUBLIC, 'docs/'));
  copyPubs();
  copyThesis();
  copyResume();

  log.success('tatic files copied to public.');
} catch (err) {
  console.error(err);
  log.error('Failed to copy static files to public.');
  process.exit(1);
}
