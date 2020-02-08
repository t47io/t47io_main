import {
  ROOT,
  PATH,
} from '../env.js';
import { FILE_NAMES } from '../config.js';
import { exec } from '../util.js';
import logger from '../logger.js';

const log = logger('cron:backup');


const backupJson = async () => {
  await exec(`mkdir -p ${PATH.BACKUP}/json/main ${PATH.BACKUP}/json/project ${PATH.BACKUP}/json/repository`);
  await Promise.all([
    exec(`cp -R ${PATH.CONFIG}/*.json ${PATH.BACKUP}/json`),
    exec(`cp -R ${PATH.CONFIG}/main/*.json ${PATH.BACKUP}/json/main`),
    exec(`cp -R ${PATH.CONFIG}/project/*.json ${PATH.BACKUP}/json/project`),
    exec(`cp -R ${PATH.CONFIG}/repository/*.json ${PATH.BACKUP}/json/repository`),
  ]);

  await Promise.all([
    exec(`rm -rf ${PATH.BACKUP}/**/*.example.json`),
    exec(`rm -rf ${PATH.BACKUP}/json/stats-*.json`),
    exec(`rm -rf ${PATH.BACKUP}/json/main.json ${PATH.BACKUP}/json/project.json`),
  ]);
  log.debug('JSON config backed up.');
};

const backupSvg = async () => {
  await exec(`mkdir -p ${PATH.BACKUP}/svg`);
  await exec(`cp -R ${PATH.CONFIG}/repository/account/*.svg ${PATH.BACKUP}/svg`);
};

const backupNginx = async () => {
  await exec(`mkdir -p ${PATH.BACKUP}/nginx`);
  await Promise.all([
    exec(`cp -R /etc/nginx/nginx.conf ${PATH.BACKUP}/nginx`),
    exec(`cp -R /etc/nginx/t47io/*.conf ${PATH.BACKUP}/nginx`),
  ]);

  log.debug('NGINX config backed up.');
};

const backupMisc = async () => {
  await Promise.all([
    exec(`cp /etc/init/uwsgi.conf ${PATH.BACKUP}`),
    exec(`cp /etc/hosts ${PATH.BACKUP}`),
    exec(`cp /etc/apt/sources.list ${PATH.BACKUP}`),
    exec(`cp /home/admin/.bash_profile ${PATH.BACKUP}/bash_profile`),
    exec(`cp /home/admin/.dircolors ${PATH.BACKUP}/dircolors`),
    exec(`cp /home/admin/.nanorc ${PATH.BACKUP}/nanorc`),
  ]);

  log.debug('System config backed up.');
};

const createTgz = async () => {
  const tarFilename = FILE_NAMES.BACKUP.replace('.gz', '');

  await exec(`cd ${ROOT} && tar -vcf ${tarFilename} backup/`);
  await exec(`zopfli ${ROOT}/${tarFilename}`);
  await exec(`rm -rf ${ROOT}/${tarFilename}`);

  log.debug('Backup TGZ file created.');
};


(async () => {
  try {
    await exec(`rm -rf ${PATH.BACKUP}`);
    await Promise.all([
      backupJson(),
      backupSvg(),
      backupNginx(),
      backupMisc(),
    ]);
    await createTgz();

    log.info('System settings and data backed up.');
  } catch (err) {
    console.error(err);
    log.error('Failed to backup System settings and data.');
    process.exit(1);
  }
})();
