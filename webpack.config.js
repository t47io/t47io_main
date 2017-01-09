'use strict';

import webpack from 'webpack';
import Plugins from './webpack.plugins.js';
import Loaders from './webpack.loaders.js';


const DEBUG = !((process.argv.indexOf('--production') > 0) || (process.argv.indexOf('-p') > 0) || (process.env.npm_lifecycle_event === 'build'));
console.log(`DEBUG mode ? ${DEBUG}`);


let entry = {
  main: [
    'bootstrap-sass-loader!./bootstrap-sass.config.js',
    // 'font-awesome-loader!./font-awesome.config.js',
    `${__dirname}/app/index.jsx`
  ]
};
if (DEBUG) { entry.main.unshift('webpack-hot-middleware/client?reload=true'); }

const config = {
  entry: entry,
  output: {
    filename: `[hash:8].${DEBUG ? "" : "min."}js`,
    chunkFilename: `[chunkhash:8].${DEBUG ? "" : "min."}js`,
    path: `${__dirname}/public`,
    publicPath: "/"
  },

  devtool: `cheap-module-${DEBUG ? "eval-" : ""}source-map`,
  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.js?$/,
    //     loader: "eslint-loader",
    //     include: `${__dirname}/src`
    //   }
    // ],
    loaders: Loaders()
  },
  plugins: Plugins(DEBUG),

  // devServer: {
  //   inline: true,
  //   port: 9000,
  //   historyApiFallback: true
  // }
};


export default config;

