import colors from 'colors';
import https from 'https';

import {
  DEBUG,
  EMAIL_RECV,
  SMTP,
} from '../config.js';

const pubs = require('../../config/index/pubs.json');


const formatPubs = () => {
  const newPubs = {};
  let sum = 0;
  pubs.items.forEach((item) => {
    item.items.forEach((pub) => {
      newPubs[pub.tag] = pub.citation;
      if (pub.citation !== null) { sum += pub.citation; }
    });
  });
  return { newPubs, sum };
};

const emailAdmin = (content) => {
  SMTP.sendMail({
    to: EMAIL_RECV,
    subject: '[t47io] Google Scholar Citation Update',
    text: content,
  }, (err) => {
    if (err) { console.log(err); }
  });
};


try {
  const req = https.request({
    host: 't47.io',
    method: 'get',
    path: '/',
  }, (res) => {
    const cert = res.socket.getPeerCertificate();
    const { newPubs, sum } = formatPubs();
    const content = `
      ${new Date().toUTCString()}

      ${JSON.stringify(newPubs, null, 2)}

      Sum: ${sum}

      SSL Certificate: ${cert.valid_to}
    `;
    if (!DEBUG) { emailAdmin(content); }
  });
  req.end();

  console.log(`${colors.green('SUCCESS')}: SSL Certificate checked and notified admin.`);
} catch (err) {
  console.log(`${colors.red('ERROR')}: Failed to check SSL Certificate and notify admin.`);
  console.log(err);
}
