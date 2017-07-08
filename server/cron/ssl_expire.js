import colors from 'colors';
import fs from 'fs-extra';
import https from 'https';
import path from 'path';

import { JSON_FORMAT } from '../config.js';

import cronJSON from '../../config/cron.json';

const SCRIPT = 'cron:https';


const checkCertificate = host => (
  new Promise((resolve) => {
    const req = https.request({ host }, (res) => {
      const cert = res.socket.getPeerCertificate();
      resolve(new Date(cert.valid_to).toISOString());
    });

    req.on('error', (error) => {
      console.error(error);
      console.log(`${colors.magenta(`[${SCRIPT}]`)} Failed to check SSL Certificate of ${colors.blue(host)}.`);
      resolve(undefined);
    });
    req.end();
  })
);


try {
  const newJSON = { ...cronJSON };
  const hostList = Object.keys(cronJSON.https);

  Promise.all(hostList.map(host => checkCertificate(host)))
  .then((values) => {
    hostList.forEach((host, i) => {
      newJSON.https[host] = values[i];
    });

    fs.writeJSONSync(path.join(__dirname, '../../config/cron.json'), newJSON, JSON_FORMAT);

    console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: SSL Certificate expiration checked.`);
  })
  .catch((err) => { throw err; });
} catch (err) {
  console.log(err);
  console.error(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to check SSL Certificate expiration.`);
}
