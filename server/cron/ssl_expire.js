import colors from 'colors';
import fs from 'fs-extra';
import https from 'https';
import path from 'path';

import { JSON_FORMAT } from '../config.js';

const cron = require('../../config/cron.json');


const checkCertificate = host => (
  new Promise((resolve) => {
    const req = https.request({ host }, (res) => {
      const cert = res.socket.getPeerCertificate();
      resolve(new Date(cert.valid_to).toISOString());
    });

    req.on('error', (error) => {
      console.error(error);
      console.log(`${colors.red('ERROR')}: Failed to check SSL Certificate of ${colors.blue(host)}.`);
      resolve(undefined);
    });
    req.end();
  })
);


try {
  const newJson = { ...cron };
  const hostList = Object.keys(cron.https);

  Promise.all(hostList.map(host => checkCertificate(host)))
  .then((values) => {
    hostList.forEach((host, i) => {
      newJson.https[host] = values[i];
    });

    fs.writeJsonSync(path.join(__dirname, '../../config/cron.json'), newJson, JSON_FORMAT);

    console.log(`${colors.green('SUCCESS')}: SSL Certificate expiration checked.`);
  })
  .catch((error) => {
    console.error(error);
    console.log(`${colors.red('ERROR')}: Failed to check SSL Certificate expiration.`);
  });
} catch (err) {
  console.error(`${colors.red('ERROR')}: Failed to check SSL Certificate expiration.`);
  console.log(err);
}
