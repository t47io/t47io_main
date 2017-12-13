import colors from 'colors';
import path from 'path';

import {
  ROOT,
  DEBUG,
  EMAIL_RECV,
  SMTP,
} from '../env.js';
import { FILE_NAMES } from '../config.js';
import { today } from '../util.js';

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
  const dateString = today.replace(/-/g, '');

  return SMTP.sendMail({
    from: EMAIL_RECV,
    to: EMAIL_RECV,
    subject: '[t47io] Google Scholar Citation Update',
    text: content,
    attachments: [{
      filename: `t47io_backup_${dateString}.tgz`,
      path: path.join(ROOT, FILE_NAMES.BACKUP),
    }],
  });
};


(async () => {
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
      const info = await emailAdmin(content);
      console.log(info);
      console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.green('SUCCESS')}: Notified admin on cron data results.`);
    } else {
      console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.yellow('WARNING')}: Admin email notification disabled when DEBUG.`);
    }
  } catch (err) {
    console.error(err);
    console.log(`${colors.magenta(`[${SCRIPT}]`)} ${colors.red('ERROR')}: Failed to notify admin on cron data results.`);
    process.exit(1);
  }
})();
