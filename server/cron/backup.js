import colors from 'colors';
import path from 'path';
import shell from 'shelljs';

import { PUBLIC_PATH } from '../env.js';
import { FILE_NAMES } from '../config.js';


const SCRIPT = 'cron:backup';
const backupPath = path.join(PUBLIC_PATH, '../backup');

const prepareFolder = () => {
  shell.rm('-rf', backupPath);
  shell.mkdir('-p', `${backupPath}/json`, `${backupPath}/nginx`);
  shell.mkdir('-p', `${backupPath}/json/main`, `${backupPath}/json/project`, `${backupPath}/json/repository`);
};

const backupJSON = () => {
  shell.cp('config/server.json', `${backupPath}/json`);
  shell.cp('-R', 'config/main/*.json', `${backupPath}/json/main`);
  shell.cp('-R', 'config/project/*.json', `${backupPath}/json/project`);
  shell.cp('-R', 'config/repository/*.json', `${backupPath}/json/repository`);
  shell.rm('-rf', `${backupPath}/**/*.example.json`);

  console.log(`${colors.magenta(`[${SCRIPT}]`)} JSON config backed up.`);
};

const backupNginx = () => {
  shell.cp('-R', '/etc/nginx/nginx.conf', `${backupPath}/nginx`);
  shell.cp('-R', '/etc/nginx/t47io/*.conf', `${backupPath}/nginx`);

  console.log(`${colors.magenta(`[${SCRIPT}]`)} Nginx config backed up.`);
};

const backupMisc = () => {
  shell.cp('/etc/init/uwsgi.conf', backupPath);
  shell.cp('/etc/hosts', backupPath);
  shell.cp('/etc/apt/sources.list', backupPath);
  shell.cp('/home/admin/.bash_profile', `${backupPath}/bash_profile`);
  shell.cp('/home/admin/.dircolors', `${backupPath}/dircolors`);
  shell.cp('/home/admin/.nanorc', `${backupPath}/nanorc`);

  console.log(`${colors.magenta(`[${SCRIPT}]`)} Misc system config backed up.`);
};

const createTgz = () => {
  const tarFilename = FILE_NAMES.BACKUP.replace('.gz', '');

  shell.cd(backupPath);
  shell.cd('..');
  shell.exec(`tar -vcf ${tarFilename} backup/`);
  shell.exec(`zopfli ${tarFilename}`);
  shell.rm('-rf', tarFilename);

  console.log(`${colors.magenta(`[${SCRIPT}]`)} Backup TGZ file created.`);
};


try {
  prepareFolder();
  backupJSON();
  backupNginx();
  backupMisc();
  createTgz();

  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: System settings and data backed up.`);
} catch (err) {
  console.error(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to backup System settings and data.`);
  process.exit(1);
}
