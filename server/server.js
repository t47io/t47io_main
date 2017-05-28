import colors from 'colors';
import emailValidator from 'email-validator';
import express from 'express';
import path from 'path';
import sanitizer from 'sanitizer';

import {
  DEBUG,
  EMAIL_CONTENT_LEN,
  EMAIL_RECV,
  SMTP,
  HTTP_CODE,
  HTML_HEADER,
  CACHE_MAX_AGE,
  RESUME_FILE_NAME,
  BOT_USER_AGENTS,
} from './config.js';
import { PROJECT_LIST } from '../applications/project/constants/projectTypes.js';
import {
  app,
  middleware,
} from './middleware.js';
import {
  renderMainHTML,
  renderProjectHTML,
} from '../build/render/client.jsx';

const { contact: { resume } } = require('../config/main.json');

const projectPathRegex = new RegExp(`^/project/(${PROJECT_LIST.join('|')})/?$`);
const errorPathRegex = new RegExp(`^/error/(${HTTP_CODE.join('|')})/?$`);
const publicPath = path.join(__dirname, '../public');

const sendErrorResponse = (code) => {
  const err = new Error();
  err.status = code;
  return err;
};


app.get('/', (req, res) => {
  if (DEBUG) {
    const mainHTML = middleware.fileSystem.readFileSync(
      path.join(publicPath, 'main.html'), 'utf8'
    );
    res.set(HTML_HEADER(DEBUG)).send(renderMainHTML(mainHTML));
  } else {
    const userAgent = req.useragent.source.toLowerCase();
    const isBot = (BOT_USER_AGENTS.filter(botUA => userAgent.includes(botUA)).length > 0);
    const isStatic = ('static' in req.query && req.query.static === '1');

    const htmlFile = (isBot || isStatic) ? 'index' : 'main';
    res.sendFile(path.join(publicPath, `${htmlFile}.html.gz`), {
      headers: HTML_HEADER(DEBUG),
      maxAge: `${CACHE_MAX_AGE} days`,
    });
  }
});
app.get(projectPathRegex, (req, res) => {
  if (DEBUG) {
    const projectHTML = middleware.fileSystem.readFileSync(
      path.join(publicPath, 'project.html'), 'utf8'
    );
    res.set(HTML_HEADER(DEBUG)).send(renderProjectHTML(projectHTML));
  } else {
    res.sendFile(path.join(publicPath, 'project.html.gz'), {
      headers: HTML_HEADER(DEBUG),
      maxAge: `${CACHE_MAX_AGE} days`,
    });
  }
});
app.use(express.static(publicPath, { maxAge: `${CACHE_MAX_AGE * 5} days` }));

app.get('/resume', (req, res) => {
  res.sendFile(path.join(publicPath, 'pdf/', resume), {
    headers: { 'Content-Disposition': `inline; filename="${RESUME_FILE_NAME}"` },
    maxAge: `${CACHE_MAX_AGE / 2} days`,
  });
});

app.route('/send')
.get((req, res, next) => {
  const code = ('success' in req.query && req.query.success === '1') ? 201 : 400;
  return next(sendErrorResponse(code));
})
.post((req, res, next) => {
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
    return res.sendStatus(201);
  });
});


// cleanup
// process.on('SIGINT', () => { server.close(); process.exit(2); });
// process.on('SIGTERM', () => { server.close(); process.exit(7); });
// process.on('exit', () => { server.close(); process.exit(0); });
// process.on('uncaughtException', (e) => { server.close(); process.exit(1); });


app.get(errorPathRegex, (req, res, next) => (
  next(sendErrorResponse(parseInt(req.params[0], 10)))
));
app.all('*', (req, res, next) => {
  const code = (req.method === 'GET') ? 404 : 405;
  return next(sendErrorResponse(code));
});

// app.use((req, res, next) => {
//   if(_.endsWith(req.url.substr(-1), '/') && req.url.length > 1) {
//     const query = req.url.slice(req.path.length);
//     res.redirect(301, req.url.slice(0, -1) + query);
//   }
//   next();
// });

app.use((err, req, res, next) => {
  let code = 500;
  if (err.status) {
    code = HTTP_CODE.includes(err.status) ? err.status : 503;
  } else {
    console.error(err);
  }

  return res.status(code).sendFile(path.join(publicPath, `e.${err.status}.html.gz`), {
    headers: HTML_HEADER(false),
    maxAge: `${CACHE_MAX_AGE} days`,
  });
});

