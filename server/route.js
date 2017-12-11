import colors from 'colors';
import emailValidator from 'email-validator';
import path from 'path';
import sanitizer from 'sanitizer';

import {
  PATH,
  DEBUG,
  EMAIL_RECV,
  SMTP,
} from './env.js';
import {
  CACHE_MAX_AGE,
  FILE_NAMES,
  EMAIL_VALID_LEN,
} from './config.js';
import { webpackMiddleware } from './middleware.js';
import {
  getPubFile,
  getThesisFile,
  getZipExt,
  getHeader,
  sendErrorResponse,
} from './util.js';
import {
  renderMainHTML,
  renderProjectHTML,
} from '../build/render/client.js';


export const sendHtmlFromCache = (name, render, req, res) => {
  const HTML = webpackMiddleware.fileSystem.readFileSync(
    path.join(PATH.PUBLIC, `${name}.html`), 'utf8'
  );
  res.set(getHeader(req)).send(render(HTML));
};
export const sendHtmlFromDisk = (name, req, res) => {
  const ext = getZipExt(req.headers, 2);

  res.sendFile(path.join(PATH.PUBLIC, `${name}.html.${ext}`), {
    headers: getHeader(req),
    maxAge: `${CACHE_MAX_AGE} days`,
  });
};


const routes = {
  main: (req, res) => {
    if (DEBUG) {
      sendHtmlFromCache('main', renderMainHTML, req, res);
    } else {
      const { isBot, browser } = req.useragent;
      const isIE = (browser === 'IE');
      const isStatic = ('static' in req.query && req.query.static === '1');

      const htmlFile = (isBot || isIE || isStatic) ? 'index' : 'main';
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

  pubs: (req, res) => {
    res.sendFile(getPubFile(req.params[0]), { maxAge: `${CACHE_MAX_AGE * 5} days` });
  },
  thesis: (req, res) => {
    res.sendFile(getThesisFile(req.params[0]), { maxAge: `${CACHE_MAX_AGE * 5} days` });
  },
  resume: (req, res) => {
    res.sendFile(path.join(PATH.PUBLIC, 'docs/resume.pdf'), {
      headers: { 'Content-Disposition': `inline; filename="${FILE_NAMES.RESUME}"` },
      maxAge: `${CACHE_MAX_AGE / 2} days`,
    });
  },

  email: {
    get: (req, res, next) => {
      const code = ('success' in req.query && req.query.success === '1') ? 201 : 400;
      return next(sendErrorResponse(code));
    },
    post: (req, res, next) => {
      const form = Object.keys(req.body).map(key => ({
        [key]: sanitizer.escape(req.body[key]),
      }))
      .reduce((obj, item) => ({
        ...obj,
        ...item,
      }), {});
      const validFields = Object.keys(form).filter(key => (form[key].length >= EMAIL_VALID_LEN[key]));

      if (form.subject.toLowerCase().startsWith('http') || !emailValidator.validate(form.email)) {
        return next(sendErrorResponse(403));
      } else if (validFields.length !== Object.keys(form).length) {
        return next(sendErrorResponse(400));
      }

      const { name, email, subject, message } = form;
      return SMTP.sendMail({
        from: EMAIL_RECV,
        to: EMAIL_RECV,
        subject,
        text: `
          ${new Date().toUTCString()}
          ${name} <${email}>

          ${message}
        `,
      })
      .then((info) => {
        console.log(info);
        console.log(`${colors.green('SUCCESS')}: Message sent on behalf of ${colors.blue(email)}.`);
        next(sendErrorResponse(201));
      })
      .catch((err) => {
        console.error(err);
        console.log(`${colors.red('ERROR')}: Failed to send email for client ${colors.blue(email)}.`);
        next(sendErrorResponse(500));
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
