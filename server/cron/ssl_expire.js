import colors from 'colors';
import fs from 'fs-extra';
import https from 'https';
import path from 'path';

import { PATH } from '../env.js';
import { JSON_FORMAT } from '../config.js';

import cronJSON from '../../config/cron.json';

const SCRIPT = 'cron:https';


const checkCertificate = host => (
  new Promise((resolve, reject) => {
    const req = https.request({ host }, (res) => {
      const cert = res.socket.getPeerCertificate();
      resolve(new Date(cert.valid_to).toISOString());
    });

    req.on('error', (error) => {
      console.error(error);
      console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to check SSL Certificate of ${colors.blue(host)}.`);
      req.end();
      reject(new Error('HTTPS failure.'));
    });
    req.end();
  })
);


(async () => {
  try {
    const hostList = Object.keys(cronJSON.https);
    const data = await Promise.all(
      hostList.map(host => checkCertificate(host))
    );
    const result = hostList.map((host, i) => ({ [host]: data[i] }))
    .reduce((obj, item) => ({
      ...obj,
      ...item,
    }), {});
    const newJSON = {
      ...cronJSON,
      https: result,
    };
    await fs.writeJSON(path.join(PATH.CONFIG, 'cron.json'), newJSON, JSON_FORMAT);

    console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: SSL Certificate expiration checked.`);
  } catch (err) {
    console.log(err);
    console.error(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to check SSL Certificate expiration.`);
    process.exit(1);
  }
})();
