import colors from 'colors';
import fs from 'fs-extra';
import https from 'https';
import path from 'path';

import { PATH } from '../env.js';
import { JSON_FORMAT } from '../config.js';
import { HOST } from '../../applications/config.js';
import logger from '../logger.js';

import cronJSON from '../../config/cron.json';

const log = logger('cron:https');


const checkCertificate = host => (
  new Promise((resolve, reject) => {
    const req = https.request({ host }, (res) => {
      const cert = res.socket.getPeerCertificate();
      resolve({
        fingerprint: cert.fingerprint256,
        issuer: cert.issuer.CN,
        serialNumber: cert.serialNumber,
        validFrom: new Date(cert.valid_from).toISOString(),
        validTo: new Date(cert.valid_to).toISOString(),
      });
    });

    req.on('error', (error) => {
      console.error(error);
      log.error(`Failed to check SSL Certificate of ${colors.blue(host)}.`);
      req.end();
      reject(new Error('HTTPS failure.'));
    });
    req.end();
  })
);


(async () => {
  try {
    const rootHost = HOST.split('//')[1];
    const newJSON = {
      ...cronJSON,
      httpsCert: await checkCertificate(rootHost),
    };
    await fs.writeJSON(path.join(PATH.CONFIG, 'cron.json'), newJSON, JSON_FORMAT);

    log.info('SSL Certificate expiration checked.');
  } catch (err) {
    console.error(err);
    log.error('Failed to check SSL Certificate expiration.');
    process.exit(1);
  }
})();
