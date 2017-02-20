import Plugins from './build/plugins.js';
import Loaders from './build/loaders.js';


const DEBUG = !((process.argv.indexOf('--production') > 0) || (process.argv.indexOf('-p') > 0) || (process.env.npm_lifecycle_event === 'build'));
console.log(`DEBUG mode ? ${DEBUG}`);


const entry = {
  main: [
    'bootstrap-loader',
    // 'bootstrap-sass-loader!./bootstrap-sass.config.js',
    // 'font-awesome-loader!./font-awesome.config.js',
    './app/index.jsx',
  ],
  error: './app/error.jsx',
};
if (DEBUG) { entry.main.unshift('webpack-hot-middleware/client?reload=true'); }

const config = {
  entry,
  output: {
    filename: `${DEBUG ? '[name]-[hash:8]' : '[chunkhash:8].min'}.js`,
    chunkFilename: `[chunkhash:8].${DEBUG ? '' : 'min.'}js`,
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

  module: { rules: Loaders() },
  plugins: Plugins(DEBUG),

  // devServer: {
  //   inline: true,
  //   port: 9000,
  //   historyApiFallback: true
  // }
};


export default config;
