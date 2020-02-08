import path from 'path';

import { DAY_MILLISECONDS } from '../../applications/main/constants/util.js';
import { ROOT } from '../env.js';
import { exec } from '../util.js';
import logger from '../logger.js';

import cronJSON from '../../config/cron.json';

const log = logger('cron:renew');


const checkExpire = () => {
  const expireDate = new Date(cronJSON.httpsCert.validTo).getTime();
  const currentDate = new Date().getTime();
  return (expireDate - currentDate < DAY_MILLISECONDS * 10);
};

const runLetsencrypt = async () => {
  const execPath = path.join(ROOT, '../../', 'letsencrypt');
  await exec(`${execPath}/letsencrypt-auto renew`);
};


(async () => {
  try {
    if (checkExpire()) {
      await exec('service nginx stop');
      await runLetsencrypt();
      await exec('service nginx start');

      log.info('SSL Certificate renewed.');
    }
  } catch (err) {
    console.error(err);
    log.error('Failed to renew SSL Certificate.');
    process.exit(1);
  }
})();
