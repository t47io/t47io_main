import shell from 'shelljs';

import { PATH } from '../env.js';
import { FILE_NAMES } from '../config.js';
import logger from '../logger.js';

const log = logger('cron:backup');


const prepareFolder = () => {
  shell.rm('-rf', PATH.BACKUP);
  shell.mkdir('-p', `${PATH.BACKUP}/json`, `${PATH.BACKUP}/svg`, `${PATH.BACKUP}/nginx`);
  shell.mkdir('-p', `${PATH.BACKUP}/json/main`, `${PATH.BACKUP}/json/project`, `${PATH.BACKUP}/json/repository`);
};

const backupJSON = () => {
  shell.cp('-R', 'config/*.svg', `${PATH.BACKUP}/svg`);

  shell.cp('-R', 'config/*.json', `${PATH.BACKUP}/json`);
  shell.cp('-R', 'config/main/*.json', `${PATH.BACKUP}/json/main`);
  shell.cp('-R', 'config/project/*.json', `${PATH.BACKUP}/json/project`);
  shell.cp('-R', 'config/repository/*.json', `${PATH.BACKUP}/json/repository`);
  shell.rm('-rf', `${PATH.BACKUP}/**/*.example.json`);
  shell.rm('-rf', `${PATH.BACKUP}/stats-*.json`);
  shell.rm('-rf', `${PATH.BACKUP}/main.json`, `${PATH.BACKUP}/project.json`);

  log.debug('JSON config backed up.');
};

const backupNginx = () => {
  shell.cp('-R', '/etc/nginx/nginx.conf', `${PATH.BACKUP}/nginx`);
  shell.cp('-R', '/etc/nginx/t47io/*.conf', `${PATH.BACKUP}/nginx`);

  log.debug('NGINX config backed up.');
};

const backupMisc = () => {
  shell.cp('/etc/init/uwsgi.conf', PATH.BACKUP);
  shell.cp('/etc/hosts', PATH.BACKUP);
  shell.cp('/etc/apt/sources.list', PATH.BACKUP);
  shell.cp('/home/admin/.bash_profile', `${PATH.BACKUP}/bash_profile`);
  shell.cp('/home/admin/.dircolors', `${PATH.BACKUP}/dircolors`);
  shell.cp('/home/admin/.nanorc', `${PATH.BACKUP}/nanorc`);

  log.debug('System config backed up.');
};

const createTgz = () => {
  const tarFilename = FILE_NAMES.BACKUP.replace('.gz', '');

  shell.cd(PATH.BACKUP);
  shell.cd('..');
  shell.exec(`tar -vcf ${tarFilename} backup/`);
  shell.exec(`zopfli ${tarFilename}`);
  shell.rm('-rf', tarFilename);

  log.debug('Backup TGZ file created.');
};


try {
  prepareFolder();
  backupJSON();
  backupNginx();
  backupMisc();
  createTgz();

  log.info('System settings and data backed up.');
} catch (err) {
  console.error(err);
  log.error('Failed to backup System settings and data.');
  process.exit(1);
}
