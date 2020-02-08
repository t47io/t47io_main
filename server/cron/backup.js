import {
  PATH,
} from '../env.js';
import { FILE_NAMES } from '../config.js';
import { exec } from '../util.js';
import logger from '../logger.js';

const log = logger('cron:backup');


const backupJson = async () => {
  await exec(`mkdir -p ${PATH.BACKUP}/json`);
  await exec(`cd ${PATH.CONFIG} && find . -name '*.json' ! -name '*.example.json' -exec rsync -R {} ${PATH.BACKUP}/json \\;`);
  await exec(`cd ${PATH.BACKUP}/json && rm -rf stats-*.json main.json project.json`);

  log.debug('JSON config backed up.');
};

const backupSvg = async () => {
  await exec(`mkdir -p ${PATH.BACKUP}/svg`);
  await exec(`cp -R ${PATH.CONFIG}/repository/account/*.svg ${PATH.BACKUP}/svg`);

  log.debug('SVG data backed up.');
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
    exec(`cp ${PATH.HOME}/.bash_profile ${PATH.BACKUP}/bash_profile`),
    exec(`cp ${PATH.HOME}/.dircolors ${PATH.BACKUP}/dircolors`),
    exec(`cp ${PATH.HOME}/.nanorc ${PATH.BACKUP}/nanorc`),
  ]);

  log.debug('System config backed up.');
};

const createTgz = async () => {
  const tarFilename = FILE_NAMES.BACKUP.replace('.gz', '');

  await exec(`cd ${PATH.ROOT} && tar -vcf ${tarFilename} backup/`);
  await exec(`zopfli ${PATH.ROOT}/${tarFilename}`);
  await exec(`rm -rf ${PATH.ROOT}/${tarFilename} ${PATH.BACKUP}`);

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
