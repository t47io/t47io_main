import glob from 'glob';
import webpack from 'webpack';

import BabiliPlugin from 'babili-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import { getChunkNames } from './entries.js';
import {
  MANIFEST_JS,
  ROOT_PATH,
} from './render/config.js';


const plugins = (DEBUG = true) => {
  const chunkNames = getChunkNames(DEBUG);

  const plugin = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEBUG,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.main, chunkNames.vendor, chunkNames.manifest],
      template: `${ROOT_PATH}/applications/index.html`,
      filename: `${ROOT_PATH}/public/main.html`,
      inject: false,
      chunk: chunkNames.main,
      manifest: MANIFEST_JS,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.project, chunkNames.vendor, chunkNames.manifest],
      template: `${ROOT_PATH}/applications/index.html`,
      filename: `${ROOT_PATH}/public/project.html`,
      inject: false,
      chunk: chunkNames.project,
      manifest: MANIFEST_JS,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.error],
      template: `${ROOT_PATH}/applications/index.html`,
      filename: `${ROOT_PATH}/public/error.html`,
      inject: false,
      chunk: chunkNames.error,
      manifest: MANIFEST_JS,
      debug: DEBUG,
    }),
    new ExtractTextPlugin({
      filename: DEBUG ? '[name].css' : '[name].[chunkhash].min.css',
      allChunks: true,
    }),
    new PurifyCSSPlugin({
      paths: [
        ...(glob.sync(`${ROOT_PATH}/applications/**/*.{jsx,json,scss}`)),
        ...(glob.sync(`${ROOT_PATH}/public/**/*.html`)),
        `${ROOT_PATH}/config/main.json`,
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
      new webpack.NamedModulesPlugin(),
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
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: chunkNames.manifest,
      filename: DEBUG ? '[name].js' : '[name].012345.min.js',
    }),
    new ManifestPlugin(),
    new BabiliPlugin(),
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
    new BrotliPlugin({ test: /\.(html|js|css)$/i }),
    new CompressionPlugin({
      test: /\.(html|js|css)$/i,
      algorithm: 'zopfli',
      deleteOriginalAssets: true,
    }),
  ];
};


export default plugins;
