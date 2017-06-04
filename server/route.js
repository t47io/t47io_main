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
  HTML_HEADER,
  CACHE_MAX_AGE,
  DEFENSE_FILE_NAME,
  RESUME_FILE_NAME,
  BOT_USER_AGENTS,
} from './config.js';
import { webpackMiddleware } from './middleware.js';
import {
  resumeVersion,
  sendErrorResponse,
} from './util.js';
import {
  renderMainHTML,
  renderProjectHTML,
} from '../build/render/client.jsx';


const routes = {
  main: (req, res) => {
    if (DEBUG) {
      const mainHTML = webpackMiddleware.fileSystem.readFileSync(
        path.join(PUBLIC_PATH, 'main.html'), 'utf8'
      );
      res.set(HTML_HEADER(DEBUG)).send(renderMainHTML(mainHTML));
    } else {
      const userAgent = req.useragent.source.toLowerCase();
      const isBot = (BOT_USER_AGENTS.filter(botUA => userAgent.includes(botUA)).length > 0);
      const isStatic = ('static' in req.query && req.query.static === '1');

      const htmlFile = (isBot || isStatic) ? 'index' : 'main';
      res.sendFile(path.join(PUBLIC_PATH, `${htmlFile}.html.gz`), {
        headers: HTML_HEADER(DEBUG),
        maxAge: `${CACHE_MAX_AGE} days`,
      });
    }
  },
  project: (req, res) => {
    if (DEBUG) {
      const projectHTML = webpackMiddleware.fileSystem.readFileSync(
        path.join(PUBLIC_PATH, 'project.html'), 'utf8'
      );
      res.set(HTML_HEADER(DEBUG)).send(renderProjectHTML(projectHTML));
    } else {
      res.sendFile(path.join(PUBLIC_PATH, 'project.html.gz'), {
        headers: HTML_HEADER(DEBUG),
        maxAge: `${CACHE_MAX_AGE} days`,
      });
    }
  },

  resume: (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'pdf/', resumeVersion), {
      headers: { 'Content-Disposition': `inline; filename="${RESUME_FILE_NAME}"` },
      maxAge: `${CACHE_MAX_AGE / 2} days`,
    });
  },
  defense: (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, DEFENSE_FILE_NAME), { maxAge: `${CACHE_MAX_AGE * 5} days` });
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
