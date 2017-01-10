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
import path from 'path';


const app = express();
const publicPath = path.join(__dirname, '../public');


if (DEBUG) { app.use(compression()); }
app.use(function (req, res, next) {
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

app.get('/resume', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=5184000'); // 60 days
    res.setHeader('Content-Disposition', 'inline; filename="SiqiTian_resume.pdf"');
    res.sendFile(getResume(publicPath));
});



// cleanup
// process.on('SIGINT', () => { server.close(); process.exit(2); });
// process.on('SIGTERM', () => { server.close(); process.exit(7); });
// process.on('exit', () => { server.close(); process.exit(0); });
// process.on('uncaughtException', (e) => { server.close(); process.exit(1); });

