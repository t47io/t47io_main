import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';

import glob from 'glob';
import path from 'path';

import {
  indexPage,
  errorPage,
  helixLoading,
  googleAnalytics,
  htmlMinify,
} from './render.jsx';

const rootPath = path.join(__dirname, '../');


const plugins = (DEBUG) => {
  let plugin = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEBUG,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: ['main', 'vendor', 'manifest'],
      template: `${rootPath}/applications/main/index.html`,
      filename: `${rootPath}/public/index.html`,
      inject: false,
      minify: htmlMinify,

      ...indexPage,
      helixLoading,
      googleAnalytics,
    }),
    new HtmlWebpackPlugin({
      chunks: ['error'],
      template: `${rootPath}/applications/error/index.html`,
      filename: `${rootPath}/public/error.html`,
      inject: false,
      minify: htmlMinify,

      ...errorPage,
      googleAnalytics,
    }),
    new ExtractTextPlugin({
      filename: DEBUG ? '[name]-[hash:8].css' : '[chunkhash:8].min.css',
      allChunks: true,
    }),
    new PurifyCSSPlugin({
      paths: [
        ...(glob.sync(`${rootPath}/applications/**/*.{jsx,json,scss}`)),
        ...(glob.sync(`${rootPath}/public/**/*.html`)),
        `${rootPath}/public/config.json`,
      ],
      styleExtensions: ['.css', '.scss'],
      moduleExtensions: ['.html'],
      purifyOptions: {
        minify: !DEBUG,
        info: !DEBUG,
        rejected: !DEBUG,
      },
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: DEBUG ? '[name]-[hash:8].js' : '[chunkhash:8].min.js',
    }),
  ];
  if (!DEBUG) {
    plugin = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          BABEL_ENV: JSON.stringify('production'),
        },
      }),
      ...plugin,
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        filename: '[name]-[hash:8].js',
      }),
      new BabiliPlugin({
        comments: false,
      }),
      new UglifyJsPlugin({
        beautify: false,
        comments: false,
        sourceMap: false,
        compress: {
          warnings: false,
          drop_console: true,
        },
        mangle: {
          except: ['$'],
          screw_ie8: true,
          keep_fnames: false,
        },
      }),
      new OptimizeJsPlugin({
        sourceMap: false,
      }),
      // new webpack.optimize.AggressiveMergingPlugin({
      //   minSizeReduce: 1.2
      // }),
    ];
  } else {
    plugin = [
      new webpack.HotModuleReplacementPlugin(),
      ...plugin,
    ];
  }

  return plugin;
};


export default plugins;
