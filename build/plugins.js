import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import purify from 'purifycss-webpack-plugin';
import path from 'path';

import {indexPage, errorPage, helixLoading, googleAnalytics} from './render.js';

const rootPath = path.join(__dirname, '../');


const Plugins = (DEBUG) => {
  let plugin = [
    new HtmlWebpackPlugin({
      chunks: ['main'],
      template: `${rootPath}/app/index.html`,
      filename: `${rootPath}/public/index.html`,
      inject: false,

      ...indexPage,
      helixLoading, 
      googleAnalytics
    }),
    new HtmlWebpackPlugin({
      chunks: ['error'],
      template: `${rootPath}/app/error.html`,
      filename: `${rootPath}/public/error.html`,
      inject: false,

      ...errorPage,
      googleAnalytics
    }),
    new ExtractTextPlugin({
      filename: `${DEBUG ? "[name]-[hash:8]" : "[chunkhash:8].min"}.css`,
      allChunks: true
    }),
    new purify({
      basePath: rootPath,
      paths: [
        'app/**/*.jsx',
        'app/**/*.json',
        'app/**/*.scss',
        'public/index.html'
      ],
      purifyOptions: {
        minify: !DEBUG,
        info: !DEBUG,
        // rejected: true
      }
    }),
    new LodashModuleReplacementPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   filename: `[name]-[hash:8].${DEBUG ? "" : "min."}js`,
    //   // chunks: ['main'],
    //   // async: true,
    //   children: true,
    //   minChunks: 2
    // }),
  ];
  if (!DEBUG) {
    plugin = [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          'BABEL_ENV': JSON.stringify('production')
        }
      }),
      ...plugin,
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
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
          drop_console: true
        },
        mangle: {
          except: ['$'],
          screw_ie8: true,
          keep_fnames: false
        }
      }),
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      // new webpack.optimize.AggressiveMergingPlugin({
      //   minSizeReduce: 1.2
      // }),
    ];
  } else {
    plugin = [
      new webpack.HotModuleReplacementPlugin(),
      ...plugin
    ];
  }

  return plugin;
};


export default Plugins;
