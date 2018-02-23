import glob from 'glob';
import path from 'path';
import webpack from 'webpack';

import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ChunkRenamePlugin from 'chunk-rename-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import ZopfliPlugin from 'zopfli-webpack-plugin';

import {
  ROOT,
  PATH,
} from '../server/env.js';
import {
  getChunkName,
  CHUNK_FILENAME_MAP,
  MANIFEST_JS,
  HTML_TEMPLATE,
  GZIP_FILE_TYPES,
} from './config.js';


const compressionRegex = new RegExp(`.(${GZIP_FILE_TYPES.join('|')})$`);

const plugins = (DEBUG = true) => {
  const CSS_CHUNKS = [
    'mainApp',
    'projectApp',
    'vendor',
  ];
  const MAIN_CHUNKS = [
    'vendor',
    'mainData',
    'mainImage',
    'mainApp',
  ];
  const PROJECT_CHUNKS = [
    'vendor',
    'projectData',
    'projectApp',
  ];

  const CSS_CHUNK_MAPS = CHUNK_FILENAME_MAP(DEBUG, true);
  const JS_CHUNK_MAPS = CHUNK_FILENAME_MAP(DEBUG, false);
  const getChunkArgs = chunks => ({
    js: chunks.filter(chunk => chunk !== 'manifest').map(chunk => getChunkName(chunk, DEBUG)),
    css: chunks.filter(chunk => CSS_CHUNKS.includes(chunk)).map(chunk => getChunkName(chunk, DEBUG)),
    manifest: MANIFEST_JS,
    debug: DEBUG,
  });

  const plugin = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEBUG,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      chunks: MAIN_CHUNKS,
      template: path.join(ROOT, HTML_TEMPLATE),
      filename: path.join(PATH.PUBLIC, 'main.html'),
      inject: false,
      args: getChunkArgs(MAIN_CHUNKS),
    }),
    new HtmlWebpackPlugin({
      chunks: PROJECT_CHUNKS,
      template: path.join(ROOT, HTML_TEMPLATE),
      filename: path.join(PATH.PUBLIC, 'project.html'),
      inject: false,
      args: getChunkArgs(PROJECT_CHUNKS),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => (
        module.resource && !module.resource.includes('frappe') && (
          module.resource.includes('node_modules/') ||
          (module.resource.includes('applications/vendor/') && module.resource.endsWith('css'))
        )
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'mainData',
      chunks: ['mainApp'],
      minChunks: module => (
        module.resource && module.resource.endsWith('.json')
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'mainImage',
      chunks: ['mainApp'],
      minChunks: module => (
        module.resource && (
          module.resource.includes('applications/main/images/') ||
          module.resource.endsWith('.mp3')
        )
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'projectData',
      chunks: ['projectApp'],
      minChunks: module => (
        module.resource && module.resource.endsWith('.json')
      ),
    }),
    new ExtractTextPlugin({
      filename: getPath => getPath(CSS_CHUNK_MAPS[getPath('[name]')]),
      allChunks: true,
    }),
    new PurifyCSSPlugin({
      paths: [
        ...(glob.sync(path.join(PATH.APP, '**/*.{jsx,json,scss}'))),
        ...(glob.sync(path.join(PATH.PUBLIC, '**/*.html'))),
        path.join(PATH.CONFIG, 'main.json'),
        path.join(PATH.CONFIG, 'project.json'),
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
      new ChunkRenamePlugin(JS_CHUNK_MAPS),
    ];
  }

  return [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      BABEL_ENV: 'production',
    }),
    ...plugin,
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('manifest'),
    new ManifestPlugin(),
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
    new ZopfliPlugin({
      test: compressionRegex,
      algorithm: 'zopfli',
      minRatio: Infinity,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: path.join(PATH.CONFIG, 'stats.json'),
      reportFilename: path.join(PATH.CONFIG, 'stats.html'),
    }),
  ];
};


export default plugins;
