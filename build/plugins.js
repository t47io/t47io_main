import glob from 'glob';
import path from 'path';
import webpack from 'webpack';

import BabiliPlugin from 'babili-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import { getChunkNames } from './entries.js';

const rootPath = path.join(__dirname, '../');


const plugins = (DEBUG = true) => {
  const chunkNames = getChunkNames(DEBUG);

  const plugin = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEBUG,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.main, chunkNames.vendor, chunkNames.manifest],
      template: `${rootPath}/applications/index.html`,
      filename: `${rootPath}/public/main.html`,
      inject: false,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.project, chunkNames.vendor, chunkNames.manifest],
      template: `${rootPath}/applications/index.html`,
      filename: `${rootPath}/public/project.html`,
      inject: false,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.error],
      template: `${rootPath}/applications/index.html`,
      filename: `${rootPath}/public/error.html`,
      inject: false,
    }),
    new ExtractTextPlugin({
      filename: DEBUG ? '[name].css' : '[name].[chunkhash].min.css',
      allChunks: true,
    }),
    new PurifyCSSPlugin({
      paths: [
        ...(glob.sync(`${rootPath}/applications/**/*.{jsx,json,scss}`)),
        ...(glob.sync(`${rootPath}/public/**/*.html`)),
        `${rootPath}/config/main.json`,
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
      name: chunkNames.vendor,
      filename: DEBUG ? '[name].js' : '[name].[chunkhash].min.js',
    }),
  ];

  if (DEBUG) {
    return [
      new webpack.HotModuleReplacementPlugin(),
      ...plugin,
    ];
  }
  return [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BABEL_ENV: '"production"',
      },
    }),
    ...plugin,
    new webpack.optimize.CommonsChunkPlugin({
      name: chunkNames.manifest,
      filename: DEBUG ? '[name].js' : '[name].012345.min.js',
    }),
    new BabiliPlugin({ comments: false }),
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
    new OptimizeJsPlugin({ sourceMap: false }),
    new CompressionPlugin({
      test: /\.(html|js|css)$/i,
      asset: '[path].gz',
      deleteOriginalAssets: true,
    }),
  ];
};


export default plugins;
