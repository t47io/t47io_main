import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import bodyParser from 'body-parser';
import childProcess from 'child_process';
import compression from 'compression';
import expressStatic from 'express-static-gzip';
import favicon from 'serve-favicon';
import fs from 'fs-extra';
import helmet from 'helmet';
import path from 'path';
import userAgent from 'express-useragent';

import webpackConfig from '../webpack.config.client.js';
import {
  PUBLIC_PATH,
  DEBUG,
} from './env.js';
import {
  CACHE_MAX_AGE,
  FILE_NAMES,
} from './config.js';
import { MANIFEST_JS } from '../build/config.js';


const middlewares = [
  DEBUG ? compression() : [
    '/',
    expressStatic(`${PUBLIC_PATH}/`, {
      enableBrotli: true,
      indexFromEmptyFile: false,
      maxAge: `${CACHE_MAX_AGE * 5} days`,
      setHeaders: (res, uri) => {
        if (uri.includes(MANIFEST_JS)) {
          res.setHeader('Cache-Control', 'no-cache, max-age=0');
        }
      },
    }),
  ],
  favicon(path.join(PUBLIC_PATH, FILE_NAMES.FAVICO)),
  helmet(),
  bodyParser.json(),
  userAgent.express(),
];


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
