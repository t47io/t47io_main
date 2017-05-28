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
import helmet from 'helmet';
import path from 'path';
import staticGzip from 'http-static-gzip-regexp';

import webpackConfig from '../webpack.config.client.js';
import {
  DEBUG,
  PORT,
  FAVICO_FILE_NAME,
} from './config.js';


const publicPath = path.join(__dirname, '../public');
const app = express();
let middleware = null;

if (DEBUG) {
  app.use(compression());
} else {
  app.use(staticGzip(/\.(html|js|css)$/i));
}
app.use(favicon(path.join(publicPath, FAVICO_FILE_NAME)));
app.use(helmet());
app.use(bodyParser.json());
app.disable('x-powered-by');


if (DEBUG) {
  childProcess.execSync('npm run json');

  const compiler = webpack(webpackConfig);
  middleware = webpackDevMiddleware(compiler, {
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
  middleware.waitUntilValid(() => {
    const errorHTML = middleware.fileSystem.readFileSync(path.join(publicPath, 'error.html'));
    fs.writeFileSync(
      path.join(__dirname, '../public/error.html'),
      errorHTML, 'utf8'
    );
    childProcess.execSync('npm run process:error');
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

app.listen(PORT, () => console.log(`${colors.rainbow('t47io Main Site')} listening on port: ${colors.red(PORT)} ...`));

export {
  app,
  middleware,
};
