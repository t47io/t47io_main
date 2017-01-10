import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config_webpack from '../webpack.config.js';
import {DEBUG, PORT, EMAIL_RECV, SMTP} from './config.js';
import {getResume} from './_util.js';

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import fs from 'fs-extra';
import glob from 'glob-promise';
import helmet from 'helmet';
import _ from 'lodash';
import path from 'path';


const app = express();
const publicPath = path.join(__dirname, '../public');


if (DEBUG) { app.use(compression()); }
app.use((req, res, next) => {
  if (req.url.match(/\.(png|jpg|gif|svg|ttf|pdf)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=5184000');      // 60 days
  } else if (req.url.match(/\.(css|js|json)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=1296000');      // 15 days
  }
  next();
});
app.use(express.static(publicPath));
app.use(helmet());
app.use(bodyParser.urlencoded({'extended': true}));
app.disable('x-powered-by');


if (DEBUG) {
  const compiler = webpack(config_webpack);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config_webpack.output.publicPath,
    index: "index.html",

    noInfo: false,
    quiet: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    serverSideRender: false,
    stats: {
      colors: true
    }
	});

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // remove public/ files for DEBUG
  fs.removeSync(path.join(publicPath, 'index.html'));
  glob.sync(path.join(publicPath, '*.min.+(js|css)*')).forEach((path) => fs.removeSync(path));
  fs.removeSync(path.join(publicPath, 'image'));
  fs.removeSync(path.join(publicPath, 'font'));
}

const server = app.listen(PORT, () => {
  console.log('t47io Main Site listening on port: ' + PORT + ' ...');
});


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
app.get(/^\/favicon\.ico\/?$/, (req, res) => {
  res.sendFile('t47_icon.png', {root: publicPath});
});


app.route('/send')
.get((req, res, next) => {
  res.status(405).send();
})
.post((req, res, next) => {
  let form = _.map(req.body, (item) => sanitizer.escape(item));
  console.log(form)
  console.log(_.filter(form, (item) => item.length) )
  res.status(401).send();

  if (_.filter(form, (item) => item.length) === 4) {
      if (_.startsWith(subject, 'http')) {
          res.status(403).send();
      } else {
        SMTP.sendMail({
          to: EMAIL_RECV,
          subject,
          text: name + ' <' + email + '>\n' + moment().format() + '\n\n' + message
        }, (err, info) => {
          if (err) {
            console.log(err);
            res.status(500).send();
          }
          console.log('Message sent.');
          res.status(201).send();
        });
      }
  } else {
    res.status(400).send();
  }
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

  res.status(err.status).send(err.status);
  // res.render('http_' + err.status.toString() + '.html', {
  //   'DEBUG': DEBUG,
  //   'GA_ID': GA_ID
  // });
});

