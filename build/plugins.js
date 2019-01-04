import glob from 'glob';
import path from 'path';
import webpack from 'webpack';
import { gzip as zopfli } from '@gfx/zopfli';

import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ChunkRenamePlugin from 'chunk-rename-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';

import {
  ROOT,
  PATH,
} from '../server/env.js';
import {
  getChunkFilenameMap,
  getChunkArgs,
  CHUNK_MAIN_APP,
  CHUNK_MAIN_DAT,
  CHUNK_MAIN_IMG,
  CHUNK_PROJ_APP,
  CHUNK_PROJ_DAT,
  CHUNK_VENDOR,
  CHUNK_MANIFEST,
  CHUNKS_MAIN,
  CHUNKS_PROJECT,
} from './chunks.js';
import {
  HTML_TEMPLATE,
  GZIP_FILE_TYPES,
} from './config.js';
import { getNow } from '../server/util.js';


const now = getNow(/[-:.TZ]/g, 19);
const compressionRegex = new RegExp(`.(${GZIP_FILE_TYPES.join('|')})$`);

const plugins = (DEBUG = true) => {
  const CSS_CHUNK_MAPS = getChunkFilenameMap(DEBUG, true);
  const JS_CHUNK_MAPS = getChunkFilenameMap(DEBUG, false);

  const plugin = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEBUG,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      template: path.join(ROOT, HTML_TEMPLATE),
      filename: path.join(PATH.PUBLIC, 'main.html'),
      inject: false,
      args: getChunkArgs(CHUNKS_MAIN, DEBUG),
    }),
    new HtmlWebpackPlugin({
      template: path.join(ROOT, HTML_TEMPLATE),
      filename: path.join(PATH.PUBLIC, 'project.html'),
      inject: false,
      args: getChunkArgs(CHUNKS_PROJECT, DEBUG),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: CHUNK_VENDOR,
      minChunks: ({ resource = '' }) => {
        if (resource.includes('frappe')) {
          return false;
        }
        const dir = path.dirname(resource);
        const ext = path.extname(resource);
        return (dir.includes('node_modules') || (
          dir.includes('vendor') && ext === '.scss'
        ));
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: CHUNK_MAIN_DAT,
      chunks: [CHUNK_MAIN_APP],
      minChunks: ({ resource = '' }) => (path.extname(resource) === '.json'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: CHUNK_MAIN_IMG,
      chunks: [CHUNK_MAIN_APP],
      minChunks: ({ resource = '' }) => (
        path.dirname(resource).includes('main/images') ||
        path.extname(resource) === '.mp3'
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: CHUNK_PROJ_DAT,
      chunks: [CHUNK_PROJ_APP],
      minChunks: ({ resource = '' }) => (path.extname(resource) === '.json'),
    }),
    new ExtractTextPlugin({
      filename: getPath => getPath(CSS_CHUNK_MAPS[getPath('[name]')]),
      allChunks: true,
    }),
    new PurifyCSSPlugin({
      paths: [
        ...(glob.sync(path.join(PATH.APP, '**/*.{jsx,json,scss}'))),
        path.join(PATH.CONFIG, 'main.json'),
        path.join(PATH.CONFIG, 'project.json'),
      ],
      styleExtensions: ['.css', '.scss'],
      moduleExtensions: ['.html'],
      purifyOptions: {
        whitelist: ['*__*'],
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      BABEL_ENV: 'production',
    }),
    ...plugin,
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: CHUNK_MANIFEST,
      minChunks: Infinity,
    }),
    new ManifestPlugin({ publicPath: '' }),
    new ChunkRenamePlugin(JS_CHUNK_MAPS),
    new BabelMinifyPlugin({
      removeConsole: true,
      removeDebugger: true,
    }, {
      comments: false,
      sourceMap: false,
    }),
    new BrotliPlugin({
      test: compressionRegex,
      minRatio: Infinity,
    }),
    new CompressionPlugin({
      test: compressionRegex,
      minRatio: Infinity,
      algorithm: zopfli,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: path.join(PATH.CONFIG, `stats-${now}.json`),
      reportFilename: path.join(PATH.CONFIG, `stats-${now}.html`),
    }),
  ];
};


export default plugins;
