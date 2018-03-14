import colors from 'colors';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

import aliases from './build/aliases.js';
import entries from './build/entries.js';
import loaders from './build/loaders.js';
import plugins from './build/plugins.js';
import {
  PATH,
  DEBUG as DEBUG_CONFIG,
} from './server/env.js';


const DEBUG = !(process.argv.includes('--production') || (process.env.BABEL_ENV === 'production') || process.env.PM2_USAGE);
const DEBUG_PRINT = (DEBUG && DEBUG_CONFIG);

/* eslint-disable no-console */
console.log(colors.magenta('*********************************'));
console.log(`${DEBUG_PRINT ? ' ' : ''}${colors.blue('DEBUG')} mode applied: ${DEBUG_PRINT ? colors.green(DEBUG_PRINT) : colors.red(DEBUG_PRINT)} => ${colors.yellow(DEBUG_PRINT ? 'DEV' : 'PROD')}`);
console.log(colors.magenta('*********************************'));
/* eslint-enable */

const config = {
  entry: entries(DEBUG),
  output: {
    filename: '[name].js',
    path: PATH.PUBLIC,
    publicPath: '/',
  },

  devtool: `cheap-module-${DEBUG ? 'eval-' : ''}source-map`,
  performance: {
    assetFilter: asset => (/\.(js|css)/.test(asset)),
    maxAssetSize: 128 * 1024,
    maxEntrypointSize: (DEBUG ? 1000 : 50) * 1024,
  },
  resolve: {
    alias: aliases(),
    symlinks: false,
  },

  module: { rules: loaders(DEBUG, false) },
  plugins: plugins(DEBUG),
};

const smp = new SpeedMeasurePlugin();
const webpackConfig = DEBUG ? config : smp.wrap(config);


export default webpackConfig;
