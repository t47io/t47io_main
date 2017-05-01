import colors from 'colors';
import emailValidator from 'email-validator';
import express from 'express';
import path from 'path';
import sanitizer from 'sanitizer';

import {
  DEBUG,
  EMAIL_RECV,
  HTTP_CODE,
  HTML_HEADER,
  SMTP,
} from './config.js';
import {
  app,
  middleware,
} from './middleware.js';
import {
  renderMainHTML,
  renderProjectHTML,
} from '../build/render/render.jsx';

const indexJson = require('../config/main.json');
const projectJson = require('../config/project.json');

const projectPathRegex = new RegExp(`^/project/(${Object.keys(projectJson).join('|')})/?$`);
const errorPathRegex = new RegExp(`^/error/(${HTTP_CODE.join('|')})/?$`);
const publicPath = path.join(__dirname, '../public');


app.get('/', (req, res) => {
  if (DEBUG) {
    const mainHTML = middleware.fileSystem.readFileSync(
      path.join(publicPath, 'main.html'), 'utf8'
    );
    res.set(HTML_HEADER).send(renderMainHTML(mainHTML));
  } else {
    res.sendFile(path.join(publicPath, 'main.html'), {
      headers: HTML_HEADER,
      maxAge: '7 days',
    });
  }
});
app.get(projectPathRegex, (req, res) => {
  if (DEBUG) {
    const projectHTML = middleware.fileSystem.readFileSync(
      path.join(publicPath, 'project.html'), 'utf8'
    );
    res.set(HTML_HEADER).send(renderProjectHTML(projectHTML));
  } else {
    res.sendFile(path.join(publicPath, 'project.html'), {
      headers: HTML_HEADER,
      maxAge: '7 days',
    });
  }
});
app.use(express.static(publicPath, { maxAge: '30 days' }));

app.get('/resume', (req, res) => {
  res.sendFile(path.join(publicPath, 'pdf/', indexJson.contact.resume), {
    headers: { 'Content-Disposition': 'inline; filename="SiqiTian_resume.pdf"' },
    maxAge: '60 days',
  });
});

app.route('/send')
.get((req, res) => {
  if ('success' in req.query && req.query.success === '1') {
    return res.status(201).sendFile(
      path.join(publicPath, '201.html')
    );
  }
  return res.sendStatus(400);
})
.post((req, res) => {
  const form = req.body.map(item => sanitizer.escape(item));
  const [name, email, subject, message] = form;

  if (form.filter(item => item.length).length !== 4) {
    return res.sendStatus(400);
  }
  if (subject.toLowerCase().startsWith('http') ||
    !emailValidator.validate(email)) {
    return res.sendStatus(403);
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
      console.log(err);
      return res.sendStatus(500);
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


app.get(errorPathRegex, (req, res, next) => {
  const err = new Error();
  err.status = parseInt(req.params[0], 10);
  next(err);
});
app.all('*', (req, res, next) => {
  const code = (req.method === 'GET') ? 404 : 405;
  const err = new Error();
  err.status = code;
  next(err);
});

// app.use((req, res, next) => {
//   if(_.endsWith(req.url.substr(-1), '/') && req.url.length > 1) {
//     const query = req.url.slice(req.path.length);
//     res.redirect(301, req.url.slice(0, -1) + query);
//   }
//   next();
// });

app.use((err, req, res, next) => {
  const code = (HTTP_CODE.indexOf(err.status) !== -1) ? err.status : 503;

  return res.status(code).sendFile(path.join(publicPath, `${err.status}.html`), {
    headers: HTML_HEADER,
    maxAge: '60 days',
  });
});

