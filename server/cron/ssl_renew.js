import path from 'path';
import shell from 'shelljs';

import { DAY_MILLISECONDS } from '../../applications/main/constants/util.js';
import { ROOT } from '../env.js';
import logger from '../logger.js';

import cronJSON from '../../config/cron.json';

const log = logger('cron:renew');


const checkExpire = () => {
  const expireDate = new Date(cronJSON.httpsCert.validTo).getTime();
  const currentDate = new Date().getTime();
  return (expireDate - currentDate < DAY_MILLISECONDS * 10);
};

const runLetsencrypt = () => {
  const execPath = path.join(ROOT, '../../', 'letsencrypt');
  shell.exec(`${execPath}/letsencrypt-auto renew`);
};


try {
  if (checkExpire()) {
    shell.exec('service nginx stop');
    runLetsencrypt();
    shell.exec('service nginx start');

    log.info('SSL Certificate renewed.');
  }
} catch (err) {
  console.error(err);
  log.error('Failed to renew SSL Certificate.');
  process.exit(1);
}
