import colors from 'colors';
import emailValidator from 'email-validator';
import path from 'path';
import sanitizer from 'sanitizer';

import {
  PUBLIC_PATH,
  DEBUG,
  EMAIL_CONTENT_LEN,
  EMAIL_RECV,
  SMTP,
} from './env.js';
import {
  CACHE_MAX_AGE,
  FILE_NAMES,
  BOT_USER_AGENTS,
} from './config.js';
import {
  resumeVersion,
  getThesisFile,
  sendHtmlFromCache,
  sendHtmlFromDisk,
  sendErrorResponse,
} from './util.js';
import {
  renderMainHTML,
  renderProjectHTML,
} from '../build/render/client.jsx';


const routes = {
  main: (req, res) => {
    if (DEBUG) {
      sendHtmlFromCache('main', renderMainHTML, req, res);
    } else {
      const userAgent = req.useragent.source.toLowerCase();
      const isBot = (BOT_USER_AGENTS.filter(botUA => userAgent.includes(botUA)).length > 0);
      const isStatic = ('static' in req.query && req.query.static === '1');

      const htmlFile = (isBot || isStatic) ? 'index' : 'main';
      sendHtmlFromDisk(htmlFile, req, res);
    }
  },
  project: (req, res) => {
    if (DEBUG) {
      sendHtmlFromCache('project', renderProjectHTML, req, res);
    } else {
      sendHtmlFromDisk('project', req, res);
    }
  },

  resume: (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'pdf/', `Resume_${resumeVersion}.pdf`), {
      headers: { 'Content-Disposition': `inline; filename="${FILE_NAMES.RESUME}"` },
      maxAge: `${CACHE_MAX_AGE / 2} days`,
    });
  },
  thesis: (req, res) => {
    res.sendFile(getThesisFile(req.params[0]), { maxAge: `${CACHE_MAX_AGE * 5} days` });
  },
  email: {
    get: (req, res, next) => {
      const code = ('success' in req.query && req.query.success === '1') ? 201 : 400;
      return next(sendErrorResponse(code));
    },
    post: (req, res, next) => {
      const form = Object.keys(req.body).map(key => sanitizer.escape(req.body[key]));
      const [name, email, subject, message] = form;

      if (form.filter(item => (item.length >= EMAIL_CONTENT_LEN)).length !== 4) {
        return next(sendErrorResponse(400));
      }
      if (subject.toLowerCase().startsWith('http') || !emailValidator.validate(email)) {
        return next(sendErrorResponse(403));
      }

      return SMTP.sendMail({
        from: EMAIL_RECV,
        to: EMAIL_RECV,
        subject,
        text: `
          ${new Date().toUTCString()}
          ${name} <${email}>

          ${message}
        `,
      }, (err) => {
        if (err) {
          console.log(`${colors.red('ERROR')}: Failed to send email for client.`);
          console.error(err);
          return next(sendErrorResponse(500));
        }
        console.log(`${colors.green('SUCCESS')}: Message sent on behalf of ${email}.`);
        return next(sendErrorResponse(201));
      });
    },
  },

  error: (req, res, next) => next(sendErrorResponse(parseInt(req.params[0], 10))),
  all: (req, res, next) => {
    const code = (req.method === 'GET') ? 404 : 405;
    return next(sendErrorResponse(code));
  },
};


export default routes;
