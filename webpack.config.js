'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    `${__dirname}/app/index.js`
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
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader?emitFile=false&name=[path][name].[ext]"
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
    new webpack.HotModuleReplacementPlugin()
  ],

  // devServer: {
  //   inline: true,
  //   port: 9000,
  //   historyApiFallback: true
  // }
};
