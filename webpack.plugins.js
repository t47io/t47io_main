import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import purify from 'purifycss-webpack-plugin';

import {title, meta, helixLoading, googleAnalytics} from './webpack.render.js';
const env = require('./config/server.json');


const Plugins = (DEBUG) => {
  let plugin = [
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: `${__dirname}/public/index.html`,
      inject: false,

      title,
      meta,
      helixLoading, 
      googleAnalytics
    }),
    new ExtractTextPlugin(`[hash:8].${DEBUG ? "" : "min."}css`, {
      allChunks: true
    }),
    new purify({
      basePath: __dirname,
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
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
      new BabiliPlugin({
        comments: false
      }),
      new webpack.optimize.UglifyJsPlugin({
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
      new webpack.optimize.AggressiveMergingPlugin({
        minSizeReduce: 1.2
      })
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
