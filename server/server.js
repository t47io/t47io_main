import emailValidator from 'email-validator';
import _ from 'lodash';
import path from 'path';
import sanitizer from 'sanitizer';

import {
  DEBUG,
  EMAIL_RECV,
  SMTP,
} from './config.js';
import {
  concatIndexJSON,
  getResume,
} from './json.js';
import {
  app,
  middleware,
} from './middleware.js';


const publicPath = path.join(__dirname, '../public');
concatIndexJSON(publicPath);


app.get('/', (req, res) => {
  if (DEBUG) {
    res.type('html').send(
      middleware.fileSystem.readFileSync(path.join(publicPath, 'index.html'))
    );
  } else {
    res.sendFile(path.join(publicPath, 'index.html'));
  }
});

app.get('/resume', (req, res) => {
  res.sendFile(getResume(publicPath), {
    root: path.join(publicPath, 'pdf'),
    headers: {
      'Content-Disposition': 'inline; filename="SiqiTian_resume.pdf"',
    },
    maxAge: '60 days',
  });
});


app.route('/send')
.get((req, res) => res.sendStatus(201))
.post((req, res) => {
  const form = _.map(req.body, item => sanitizer.escape(item));
  const [name, email, subject, message] = form;

  if (_.filter(form, item => item.length).length !== 4) {
    return res.sendStatus(400);
  }
  if (_.startsWith(subject, 'http') || !emailValidator.validate(email)) {
    return res.sendStatus(403);
  }

  return SMTP.sendMail({
    to: EMAIL_RECV,
    subject,
    text: `
      ${new Date().toUTCString()}
      ${name} <${email}>

      ${message}
    `,
  }, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    console.log('Message sent.');
    return res.sendStatus(201);
  });
});


// cleanup
// process.on('SIGINT', () => { server.close(); process.exit(2); });
// process.on('SIGTERM', () => { server.close(); process.exit(7); });
// process.on('exit', () => { server.close(); process.exit(0); });
// process.on('uncaughtException', (e) => { server.close(); process.exit(1); });


app.get(/^\/error\/(400|401|403|404|405|500|502|503)\/?$/, (req, res, next) => {
  const err = new Error();
  err.status = parseInt(req.params[0], 10);
  next(err);
});
app.all('*', (req, res, next) => {
  const code = req.method === 'GET' ? 404 : 405;
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
  const code = _.includes([400, 401, 403, 404, 405, 500, 502, 503], err.status) ? err.status : 503;

  return res.status(code).sendFile(
    path.join(publicPath, `${err.status}.html`)
  );
});

