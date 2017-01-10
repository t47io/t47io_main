import colors from 'colors';
import _ from 'lodash/core';
import path from 'path';
import https from 'https';


import {DEBUG, PORT, EMAIL_RECV, SMTP} from '../config.js';

const pubs = require('../../config/index/pubs.json');


const formatPubs = () => {
  let newPubs = {}, sum = 0;
  pubs.items.map((item) => {
    item.items = item.items.map((item) => {
      newPubs[item.tag] = item.citation;
      if (item.citation !== null) { sum += item.citation; }
    });
  });
  return {newPubs, sum};
};

const emailAdmin = (content) => {
  SMTP.sendMail({
    to: EMAIL_RECV,
    subject: '[t47io] Google Scholar Citation Update',
    'text': content
  }, (err, info) => {
    if (err) { console.log(err); }
  });
};


try {
  const req = https.request({
    host: 't47.io',
    method: 'get',
    path: '/'
  }, (res) => {
    const cert = res.socket.getPeerCertificate();
    const {newPubs, sum} = formatPubs();
    const content = `
      ${new Date().toUTCString()}

      ${JSON.stringify(newPubs, null, 2)}

      Sum: ${sum}

      SSL Certificate: ${cert.valid_to}
    `;
    if (!DEBUG) { emailAdmin(content); }
  });
  req.end(); 

  console.log(`${colors.green("SUCCESS")}: SSL Certificate checked and notified admin.`);
} catch (e) {
  console.log(e);
  console.log(`${colors.red("ERROR")}: Failed to check SSL Certificate and notify admin.`);
}
