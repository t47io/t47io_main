import colors from 'colors';
import path from 'path';
import shell from 'shelljs';

import { DAY_MILLISECONDS } from '../../applications/common/constants/util.js';
import { PUBLIC_PATH } from '../env.js';

import cronJSON from '../../config/cron.json';

const SCRIPT = 'cron:renew';


const checkExpire = () => {
  const expireDate = new Date(cronJSON.https['t47.io']).getTime();
  const currentDate = new Date().getTime();
  return (expireDate - currentDate < DAY_MILLISECONDS * 10);
};

const runLetsencrypt = () => {
  const execPath = path.join(PUBLIC_PATH, '../../../', 'letsencrypt');
  shell.exec(`${execPath}/letsencrypt-auto renew`);
};


try {
  if (checkExpire()) {
    shell.exec('service nginx stop');
    runLetsencrypt();
    shell.exec('service nginx start');

    console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: SSL Certificate renewed.`);
  }
} catch (err) {
  console.error(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to renew SSL Certificate.`);
  console.log(err);
}
