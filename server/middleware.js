import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import bodyParser from 'body-parser';
import childProcess from 'child_process';
import compression from 'compression';
import express from 'express';
import staticGzip from 'express-static-gzip';
import favicon from 'serve-favicon';
import fs from 'fs-extra';
import helmet from 'helmet';
import path from 'path';
import userAgent from 'express-useragent';

import webpackConfig from '../webpack.config.client.js';
import {
  PUBLIC_PATH,
  DEBUG,
  NGINX,
} from './env.js';
import {
  CACHE_MAX_AGE,
  FILE_NAMES,
} from './config.js';


const middlewares = [
  DEBUG ? compression() : null,
  (DEBUG || !NGINX) ? favicon(path.join(PUBLIC_PATH, FILE_NAMES.FAVICO)) : null,
  DEBUG ? express.static(PUBLIC_PATH, {
    maxAge: `${CACHE_MAX_AGE * 5} days`,
  }) : null,
  !NGINX ? ['/', staticGzip(PUBLIC_PATH, {
    enableBrotli: true,
    indexFromEmptyFile: false,
  })] : null,
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
          '\'unsafe-eval\'',
          'www.google-analytics.com',
          'www.gstatic.com',
        ],
      },
    },
  }),
  bodyParser.json(),
  userAgent.express(),
].filter(Boolean);


let webpackMiddleware = null;
if (DEBUG) {
  childProcess.execSync('yarn json');

  const compiler = webpack(webpackConfig);
  webpackMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    index: '/',

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
  webpackMiddleware.waitUntilValid(() => {
    const errorHTML = webpackMiddleware.fileSystem.readFileSync(path.join(PUBLIC_PATH, 'error.html'));
    fs.writeFileSync(
      path.join(PUBLIC_PATH, 'error.html'),
      errorHTML, 'utf8'
    );
    childProcess.execSync('yarn process:error');
  });

  middlewares.push(webpackMiddleware);
  middlewares.push(webpackHotMiddleware(compiler));
}


export default middlewares;
export { webpackMiddleware };
