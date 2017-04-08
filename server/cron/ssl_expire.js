import colors from 'colors';
import fs from 'fs-extra';
import https from 'https';
import path from 'path';

const cron = require('../../config/cron.json');


const checkCertificate = host => (
  new Promise((resolve, reject) => {
    const req = https.request({ host }, (res) => {
      const cert = res.socket.getPeerCertificate();
      resolve((new Date(cert.valid_to)).toISOString());
    });

    req.on('error', (error) => {
      console.error(error);
      console.log(`${colors.red('ERROR')}: Failed to check SSL Certificate expiration.`);
      reject();
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

    fs.writeJsonSync(path.join(__dirname, '../../config/cron.json'), newJson);

    console.log(`${colors.green('SUCCESS')}: SSL Certificate expiration checked.`);
  })
  .catch((error) => {
    console.log(error);
    console.log(`${colors.red('ERROR')}: Failed to check SSL Certificate expiration.`);
  });
} catch (err) {
  console.log(`${colors.red('ERROR')}: Failed to check SSL Certificate expiration.`);
  console.log(err);
}
