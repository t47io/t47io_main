import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import favicon from 'serve-favicon';
import fs from 'fs-extra';
import glob from 'glob-promise';
import helmet from 'helmet';
import path from 'path';

import webpackConfig from '../webpack.config.js';
import {DEBUG, PORT} from './config.js';


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
app.use(favicon(path.join(publicPath, 't47_icon.png')));
app.use(express.static(publicPath));
app.use(helmet());
app.use(bodyParser.json());
app.disable('x-powered-by');


if (DEBUG) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
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


export default app;
