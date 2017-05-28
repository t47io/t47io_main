import colors from 'colors';
import path from 'path';
import shell from 'shelljs';

import { BACKUP_FILE_NAME } from '../config.js';

const backupPath = path.join(__dirname, '../../backup');

const prepareFolder = () => {
  shell.rm('-rf', backupPath);
  shell.mkdir('-p', `${backupPath}/json`, `${backupPath}/nginx`);
  shell.mkdir('-p', `${backupPath}/json/main`, `${backupPath}/json/project`, `${backupPath}/json/repository`);
};

const backupJson = () => {
  shell.cp('config/server.json', `${backupPath}/json`);
  shell.cp('-R', 'config/main/*.json', `${backupPath}/json/main`);
  shell.cp('-R', 'config/project/*.json', `${backupPath}/json/project`);
  shell.cp('-R', 'config/repository/*.json', `${backupPath}/json/repository`);
  shell.rm('-rf', `${backupPath}/**/*.example.json`);
};

const backupNginx = () => {
  shell.cp('-R', '/etc/nginx/nginx.conf', `${backupPath}/nginx`);
  shell.cp('-R', '/etc/nginx/t47io/*.conf', `${backupPath}/nginx`);
};

const backupMisc = () => {
  shell.cp('/etc/init/uwsgi.conf', backupPath);
  shell.cp('/etc/hosts', backupPath);
  shell.cp('/etc/apt/sources.list', backupPath);
  shell.cp('/home/admin/.bash_profile', `${backupPath}/bash_profile`);
  shell.cp('/home/admin/.dircolors', `${backupPath}/dircolors`);
  shell.cp('/home/admin/.nanorc', `${backupPath}/nanorc`);
};

const createTgz = () => {
  shell.cd(backupPath);
  shell.cd('..');
  shell.exec(`tar -zvcf ${BACKUP_FILE_NAME} backup/`);
};


try {
  prepareFolder();
  backupJson();
  backupNginx();
  backupMisc();
  createTgz();

  console.log(`${colors.green('SUCCESS')}: System settings and data backed up.`);
} catch (err) {
  console.error(err);
  console.log(`${colors.red('ERROR')}: Failed to backup System settings and data.`);
}
