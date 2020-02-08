import colors from 'colors';
import { promises as fs } from 'fs';
import path from 'path';

import { PATH } from '../../server/env.js';
import { FILE_NAMES } from '../../server/config.js';
import {
  resumeVersion,
  copyStaticFile,
  exec,
  glob,
} from '../../server/util.js';

import logger from '../../server/logger.js';

const log = logger('process:copy');


const copyImages = async () => {
  const staticFiles = await glob(path.join(PATH.STATIC, '*.{png,jpg}'), { nodir: true });
  await Promise.all(
    staticFiles.map(copyStaticFile)
  );
  log.debug(`Image files (${colors.red(staticFiles.length)}) copied to public.`);
};

const copyRobots = async () => {
  await copyStaticFile(FILE_NAMES.ROBOTS);
  log.debug('Robots.txt copied to public.');
};

const copyPubs = async () => {
  const staticFiles = await glob(path.join(PATH.STATIC, 'pubs/*.pdf'));
  await Promise.all(
    staticFiles.map(file => copyStaticFile(file, 'pubs/', 'docs/'))
  );
  log.debug(`Pubs PDF files (${colors.red(staticFiles.length)}) copied to public.`);
};

const copyResume = async () => {
  await fs.copyFile(
    path.join(PATH.STATIC, `resume/${resumeVersion}.pdf`),
    path.join(PATH.PUBLIC, 'docs/resume.pdf')
  );
  log.debug(`Resume PDF ${colors.blue(resumeVersion)} copied to public.`);
};

const copyThesis = async () => {
  const staticFiles = await glob(path.join(PATH.STATIC, 'thesis/*'));
  await Promise.all(
    staticFiles.map(file => copyStaticFile(file, 'thesis/', 'docs/'))
  );
  log.debug(`Thesis PDF files (${colors.red(staticFiles.length)}) copied to public.`);
};


(async () => {
  try {
    await copyImages();
    await copyRobots();

    await exec(`mkdir -p ${path.join(PATH.PUBLIC, 'docs/')}`);
    await copyPubs();
    await copyThesis();
    await copyResume();

    log.info('tatic files copied to public.');
  } catch (err) {
    console.error(err);
    log.error('Failed to copy static files to public.');
    process.exit(1);
  }
})();
