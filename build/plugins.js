import glob from 'glob';
import webpack from 'webpack';

import BabiliPlugin from 'babili-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CommonShakePlugin from 'webpack-common-shake';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ZopfliPlugin from 'zopfli-webpack-plugin';

import {
  ROOT_PATH,
  CHUNK_FILE_NAME,
  CHUNK_NAMES,
  MANIFEST_JS,
  HTML_TEMPLATE,
  GZIP_FILE_TYPES,
} from './config.js';


const compressionRegex = new RegExp(`.(${GZIP_FILE_TYPES.join('|')})$`);

const plugins = (DEBUG = true) => {
  const chunkNames = CHUNK_NAMES(DEBUG);

  const plugin = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEBUG,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.main, chunkNames.vendor, chunkNames.manifest],
      template: HTML_TEMPLATE,
      filename: `${ROOT_PATH}/public/main.html`,
      inject: false,
      chunk: chunkNames.main,
      manifest: MANIFEST_JS,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.project, chunkNames.vendor, chunkNames.manifest],
      template: HTML_TEMPLATE,
      filename: `${ROOT_PATH}/public/project.html`,
      inject: false,
      chunk: chunkNames.project,
      manifest: MANIFEST_JS,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: [chunkNames.error],
      template: HTML_TEMPLATE,
      filename: `${ROOT_PATH}/public/error.html`,
      inject: false,
      chunk: chunkNames.error,
      manifest: MANIFEST_JS,
      debug: DEBUG,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: chunkNames.vendor,
      filename: CHUNK_FILE_NAME(DEBUG),
    }),
    new ExtractTextPlugin({
      filename: CHUNK_FILE_NAME(DEBUG, 'css'),
      allChunks: true,
    }),
    new PurifyCSSPlugin({
      paths: [
        ...(glob.sync(`${ROOT_PATH}/applications/**/*.{jsx,json,scss}`)),
        ...(glob.sync(`${ROOT_PATH}/public/**/*.html`)),
        `${ROOT_PATH}/config/main.json`,
        `${ROOT_PATH}/config/project.json`,
      ],
      styleExtensions: ['.css', '.scss'],
      moduleExtensions: ['.html'],
      purifyOptions: {
        minify: !DEBUG,
        info: !DEBUG,
        rejected: false,
      },
    }),
    new LodashModuleReplacementPlugin(),
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
      filename: MANIFEST_JS,
    }),
    new ManifestPlugin(),
    new CommonShakePlugin.Plugin(),
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
      parallel: { cache: true },
    }),
    new OptimizeJsPlugin({ sourceMap: false }),
    new BrotliPlugin({
      test: compressionRegex,
      minRatio: Infinity,
    }),
    new ZopfliPlugin({
      test: compressionRegex,
      algorithm: 'zopfli',
      minRatio: Infinity,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: `${ROOT_PATH}/config/stats.json`,
      reportFilename: `${ROOT_PATH}/config/stats.html`,
    }),
  ];
};


export default plugins;
