import {DEBUG, EMAIL_RECV, SMTP} from './config.js';
import {concatIndexJSON} from './json.js';
import app from './middleware.js';
import {getResume} from './_util.js';

import emailValidator from 'email-validator';
import _ from 'lodash';
import path from 'path';
import sanitizer from 'sanitizer';


const publicPath = path.join(__dirname, '../public');
concatIndexJSON(publicPath);


app.get('/', (req, res) => {
	if (DEBUG) {
    res.write(middleware.fileSystem.readFileSync(path.join(publicPath, 'index.html')));
    res.end();
	} else {
    res.sendFile(path.join(publicPath, 'index.html'));
	}
});

app.get('/resume', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=5184000'); // 60 days
  res.setHeader('Content-Disposition', 'inline; filename="SiqiTian_resume.pdf"');
  res.sendFile(getResume(publicPath), {
    root: path.join(publicPath, 'pdf')
  });
});


app.route('/send')
.get((req, res, next) => {
  res.sendStatus(201);
})
.post((req, res, next) => {
  let form = _.map(req.body, (item) => sanitizer.escape(item));
  const [name, email, subject, message] = form;

  if (_.filter(form, (item) => item.length).length !== 4) {
    return res.sendStatus(400);
  }
  if (_.startsWith(subject, 'http') || !emailValidator.validate(email)) {
    return res.sendStatus(403);
  }

  SMTP.sendMail({
    to: EMAIL_RECV,
    subject,
    text: `
    ${new Date().toUTCString()}
    ${name} <${email}>

    ${message}
    `
  }, (err, info) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    console.log('Message sent.');
    res.sendStatus(201);
  });
});


// cleanup
// process.on('SIGINT', () => { server.close(); process.exit(2); });
// process.on('SIGTERM', () => { server.close(); process.exit(7); });
// process.on('exit', () => { server.close(); process.exit(0); });
// process.on('uncaughtException', (e) => { server.close(); process.exit(1); });


app.get(/^\/error\/(400|401|403|404|405|500|502|503)\/?$/, (req, res, next) => {
  let err = new Error();
  err.status = parseInt(req.params[0]);
  next(err);
});
app.all('*', (req, res, next) => {
  const code = req.method === 'GET' ? 404 : 405;
  let err = new Error();
  err.status = code;
  next(err);
});

app.use((req, res, next) => {
  if(_.endsWith(req.url.substr(-1), '/') && req.url.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.url.slice(0, -1) + query);
  }
  next();
});

app.use((err, req, res, next) => {
  if (!_.includes([400, 401, 403, 404, 405, 500, 502, 503], err.status)) {
    console.log(err);
    err.status = 503;
  }

  res.send(err.status);
  // res.render('http_' + err.status.toString() + '.html', {
  //   'DEBUG': DEBUG,
  //   'GA_ID': GA_ID
  // });
});

