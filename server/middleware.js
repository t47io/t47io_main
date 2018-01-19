import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import staticGzip from 'express-static-gzip';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import ms from 'ms';
import path from 'path';
import userAgent from 'express-useragent';

import webpackConfig from '../webpack.config.client.js';
import {
  PATH,
  DEBUG,
  NGINX,
} from './env.js';
import {
  CACHE_MAX_AGE,
  FILE_NAMES,
} from './config.js';
import logger from './logger.js';

const log = logger('server:middleware');


const middlewares = [
  DEBUG ? compression() : null,
  (DEBUG || !NGINX) ? favicon(path.join(PATH.PUBLIC, FILE_NAMES.FAVICO)) : null,
  DEBUG ? express.static(PATH.PUBLIC, {
    maxAge: `${CACHE_MAX_AGE * 5} days`,
  }) : null,
  !NGINX ? ['/', staticGzip(PATH.PUBLIC, {
    enableBrotli: true,
    indexFromEmptyFile: false,
    maxAge: `${CACHE_MAX_AGE * 5} days`,
  })] : null,
  helmet({
    contentSecurityPolicy: {
      directives: {
        styleSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
        ],
        scriptSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
          DEBUG ? '\'unsafe-eval\'' : null,
          'www.google-analytics.com',
        ].filter(Boolean),
        ...(NGINX ? {
          upgradeInsecureRequests: true,
        } : {}),
      },
    },
    hsts: {
      maxAge: ms(`${CACHE_MAX_AGE * 5} days`) / 1000,
      includeSubDomains: true,
      preload: true,
    },
  }),
  bodyParser.json(),
  userAgent.express(),
].filter(Boolean);


// eslint-disable-next-line import/no-mutable-exports
let webpackMiddleware = null;
if (DEBUG) {
  const compiler = webpack(webpackConfig);
  webpackMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    index: '/',

    lazy: false,
    logger: log,
    watchOptions: {
      aggregateTimeout: 2500,
      poll: true,
    },
    stats: { colors: true },
  });

  middlewares.push(webpackMiddleware);
  middlewares.push(webpackHotMiddleware(compiler));
}


export default middlewares;
export { webpackMiddleware };
