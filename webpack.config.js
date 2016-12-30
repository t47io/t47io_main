'use strict';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import purify from 'purifycss-webpack-plugin';

const DEBUG = true;


let plugin = [
  new HtmlWebpackPlugin({
    template: `${__dirname}/app/index.html`,
    filename: `${__dirname}/public/index.html`,
    inject: 'body',
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin(`[name]-[hash:8].${DEBUG ? "" : "min."}css`, {
    allChunks: true
  }),
  new purify({
    basePath: __dirname,
    paths: [
      'app/**/*.jsx',
      'app/**/*.json',
      'public/index.html'
    ],
    purifyOptions: {minify: !DEBUG}
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin()
];
if (!DEBUG) {
  plugin.push(new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {warnings: false, drop_console: true},
    mangle: {except: ['$', 'require', 'KUTE']}
  }));
}

const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'bootstrap-sass-loader!./bootstrap-sass.config.js',
    'font-awesome-loader!./font-awesome.config.js',
    `${__dirname}/app/index.jsx`
  ],
  output: {
    filename: `main-[hash:8].${DEBUG ? "" : "min."}js`,
    path: `${__dirname}/public`,
    publicPath: "/"
  },
  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      // "lodash": "underscore"
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
    loaders: [
      {
        test: /\.js(x)?$/,
        loader: "babel",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file?emitFile=false&name=[path][name].[ext]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: "file?name=[path][name].[ext]"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
      // {
      //   test: /bootstrap-sass\/assets\/javascripts\//,
      //   loader: 'imports?jQuery=jquery'
      // },
    ]
  },
  plugins: plugin,

  // devServer: {
  //   inline: true,
  //   port: 9000,
  //   historyApiFallback: true
  // }
};


export default config;

