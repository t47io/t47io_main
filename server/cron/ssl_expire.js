import colors from 'colors';
import https from 'https';

import { writeJsonFile } from '../util.js';
import { HOST } from '../../applications/config.js';
import logger from '../logger.js';

import cronJSON from '../../config/cron.json';

const log = logger('cron:https');


const checkCertificate = host => (
  new Promise((resolve, reject) => {
    const req = https.request({ host }, (res) => {
      const cert = res.socket.getPeerCertificate();
      resolve({
        subject: cert.subjectaltname,
        issuer: cert.issuer.CN,
        fingerprint: cert.fingerprint,
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
    await writeJsonFile('cron.json', newJSON);

    log.info(`SSL Certificate expiration checked (${colors.blue(newJSON.httpsCert.validTo)}).`);
  } catch (err) {
    console.error(err);
    log.error('Failed to check SSL Certificate expiration.');
    process.exit(1);
  }
})();
