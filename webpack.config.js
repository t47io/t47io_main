import colors from 'colors';

import plugins from './build/plugins.js';
import loaders from './build/loaders.js';


const DEBUG = !((process.argv.indexOf('--production') > 0) || (process.argv.indexOf('-p') > 0) || (process.env.npm_lifecycle_event === 'build'));
console.log(colors.magenta('***************************'));
console.log(`${colors.blue('DEBUG')} mode applied: ${DEBUG ? colors.green(DEBUG) : colors.red(DEBUG)}`);
console.log(colors.magenta('***************************'));


const entry = {
  main: [
    'bootstrap-loader',
    './applications/main/index.jsx',
  ],
  error: './applications/error/index.jsx',
  vendor: [
    'react',
    'react-redux',
    'react-tooltip',
    'react-waypoint',
    'react-web-animation',
    'reduce-reducers',
    'redux',
    'redux-thunk',
    'smoothscroll',
    'web-animations-js',
    'whatwg-fetch',
  ],
};
if (DEBUG) { entry.main.unshift('webpack-hot-middleware/client?reload=true'); }

const config = {
  entry,
  output: {
    filename: DEBUG ? '[name]-[hash:8].js' : '[chunkhash:8].min.js',
    chunkFilename: DEBUG ? '[name]-[chunkhash:8].js' : '[chunkhash:8].min.js',
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

  module: { rules: loaders() },
  plugins: plugins(DEBUG),
};


export default config;
