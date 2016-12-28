'use strict';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import purify from 'purifycss-webpack-plugin';

const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'bootstrap-sass-loader!./bootstrap-sass.config.js',
    'font-awesome-loader!./font-awesome.config.js',
    `${__dirname}/app/index.jsx`
  ],
  output: {
    filename: "bundle.js",
    path: `${__dirname}/public`,
    publicPath: "/"
  },
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
    loaders: [
      {
        test: /\.js(x)?$/,
        loader: "babel",
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: "json"
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
        loader: "file"
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: `${__dirname}/public/index.html`,
      inject: 'body',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new purify({
      basePath: __dirname,
      paths: [
        'app/**/*.jsx',
        'public/index.html'
      ]
    })
  ],

  // devServer: {
  //   inline: true,
  //   port: 9000,
  //   historyApiFallback: true
  // }
};


export default config;

