import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import bodyParser from 'body-parser';
import childProcess from 'child_process';
import colors from 'colors';
import compression from 'compression';
import express from 'express';
import favicon from 'serve-favicon';
import fs from 'fs-extra';
// import glob from 'glob-promise';
import helmet from 'helmet';
import path from 'path';

import webpackConfig from '../webpack.config.js';
import {
  DEBUG,
  PORT,
} from './config.js';


const publicPath = path.join(__dirname, '../public');
const app = express();
let middleware = null;

if (DEBUG) { app.use(compression()); }
app.use(favicon(path.join(publicPath, 't47_icon.png')));
app.use(helmet());
app.use(bodyParser.json());
app.disable('x-powered-by');


if (DEBUG) {
  childProcess.execSync('npm run json');

  const compiler = webpack(webpackConfig);
  middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    index: 'index.html',

    noInfo: false,
    quiet: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 2500,
      poll: true,
    },
    serverSideRender: false,
    stats: { colors: true },
  });
  middleware.waitUntilValid(() => {
    fs.writeFileSync(
      path.join(__dirname, '../public/error.html'),
      middleware.fileSystem.readFileSync(path.join(publicPath, 'error.html')),
      'utf8'
    );
    childProcess.execSync('npm run process:error');
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // remove public/ files for DEBUG
  // glob.sync(path.join(publicPath, '*.html')).forEach((path) => fs.removeSync(path));
  // glob.sync(path.join(publicPath, '*.min.+(js|css)*')).forEach((path) => fs.removeSync(path));
  // fs.removeSync(path.join(publicPath, 'image'));
  // fs.removeSync(path.join(publicPath, 'font'));
}

app.listen(PORT, () => console.log(`${colors.rainbow('t47io Main Site')} listening on port: ${colors.red(PORT)} ...`));

export {
  app,
  middleware,
};
