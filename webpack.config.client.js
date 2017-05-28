import colors from 'colors';

import entries from './build/entries.js';
import loaders from './build/loaders.js';
import plugins from './build/plugins.js';


const DEBUG = !(process.argv.includes('--production') || (process.env.BABEL_ENV === 'production') || process.env.PM2_USAGE);
console.log(colors.magenta('*********************************'));
console.log(`${DEBUG ? ' ' : ''}${colors.blue('DEBUG')} mode applied: ${DEBUG ? colors.green(DEBUG) : colors.red(DEBUG)} => ${colors.yellow(DEBUG ? 'DEV' : 'PROD')}`);
console.log(colors.magenta('*********************************'));

const config = {
  entry: entries(DEBUG),
  output: {
    filename: DEBUG ? '[name].js' : '[name].[chunkhash].min.js',
    chunkFilename: DEBUG ? '[name].js' : '[name].[chunkhash].min.js',
    hashDigestLength: 6,
    path: `${__dirname}/public`,
    publicPath: '/',
  },

  devtool: `cheap-module-${DEBUG ? 'eval-' : ''}source-map`,
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },

  module: { rules: loaders(false) },
  plugins: plugins(DEBUG),
};


export default config;
