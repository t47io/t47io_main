import colors from 'colors';
import path from 'path';

import {
  DEBUG,
  EMAIL_RECV,
  SMTP,
} from '../env.js';
import { FILE_NAMES } from '../config.js';

import cronJSON from '../../config/cron.json';

const SCRIPT = 'cron:email';


const formatPubs = () => {
  let sumCitation = 0;

  Object.keys(cronJSON.citations).forEach((tag) => {
    sumCitation += parseInt(cronJSON.citations[tag], 10) || 0;
  });
  return sumCitation;
};

const emailAdmin = (content) => {
  const dateString = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  SMTP.sendMail({
    from: EMAIL_RECV,
    to: EMAIL_RECV,
    subject: '[t47io] Google Scholar Citation Update',
    text: content,
    attachments: [{
      filename: `t47io_backup_${dateString}.tgz`,
      path: path.join(__dirname, `../../${FILE_NAMES.BACKUP}`),
    }],
  }, (err) => {
    if (err) { throw err; }
  });
};


try {
  const content = `
${new Date().toISOString()}

Google Scholar Citations:
${JSON.stringify(cronJSON.citations, null, 2)}
  ( total = ${formatPubs()} )

GitHub Contributions:
${JSON.stringify(cronJSON.gitContrib, null, 2)}

SSL Certificates:
${JSON.stringify(cronJSON.https, null, 2)}
  `;
  if (!DEBUG) {
    emailAdmin(content);
    console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Notified admin on cron data results.`);
  }
} catch (err) {
  console.error(err);
  console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to notify admin on cron data results.`);
  process.exit(1);
}
