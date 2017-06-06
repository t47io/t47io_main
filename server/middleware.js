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
  FAVICO_FILE_NAME,
} from './config.js';


const middlewares = [
  DEBUG ? compression() : [
    '/',
    expressStatic(`${PUBLIC_PATH}/`, {
      enableBrotli: true,
      indexFromEmptyFile: false,
    }),
  ],
  favicon(path.join(PUBLIC_PATH, FAVICO_FILE_NAME)),
  helmet(),
  bodyParser.json(),
  userAgent.express(),
];


let webpackMiddleware = null;
if (DEBUG) {
  childProcess.execSync('yarn run json');

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
    childProcess.execSync('yarn run process:error');
  });

  middlewares.push(webpackMiddleware);
  middlewares.push(webpackHotMiddleware(compiler));
}


export default middlewares;
export { webpackMiddleware };
