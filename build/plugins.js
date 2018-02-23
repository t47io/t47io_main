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
  CSS_CHUNKS,
  MAIN_CHUNKS,
  PROJECT_CHUNKS,
  CHUNK_FILENAME_MAP,
  MANIFEST_JS,
  HTML_TEMPLATE,
  GZIP_FILE_TYPES,
} from './config.js';


const compressionRegex = new RegExp(`.(${GZIP_FILE_TYPES.join('|')})$`);

const plugins = (DEBUG = true) => {
  const CSS_CHUNK_MAPS = CHUNK_FILENAME_MAP(DEBUG, true);
  const JS_CHUNK_MAPS = CHUNK_FILENAME_MAP(DEBUG, false);
  const getChunkArgs = chunks => ({
    debug: DEBUG,
    manifest: MANIFEST_JS,
    js: chunks.map(chunk => getChunkName(chunk, DEBUG)),
    css: chunks.filter(chunk => CSS_CHUNKS.includes(chunk)).map(chunk => getChunkName(chunk, DEBUG)),
  });

  const plugin = [
    new webpack.LoaderOptionsPlugin({
      minimize: !DEBUG,
      debug: DEBUG,
    }),
    new HtmlWebpackPlugin({
      template: path.join(ROOT, HTML_TEMPLATE),
      filename: path.join(PATH.PUBLIC, 'main.html'),
      inject: false,
      args: getChunkArgs(MAIN_CHUNKS),
    }),
    new HtmlWebpackPlugin({
      template: path.join(ROOT, HTML_TEMPLATE),
      filename: path.join(PATH.PUBLIC, 'project.html'),
      inject: false,
      args: getChunkArgs(PROJECT_CHUNKS),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource = '' }) => {
        if (resource.includes('frappe')) {
          return false;
        }
        const dir = path.dirname(resource);
        const ext = path.extname(resource);
        return (dir.includes('node_modules') || (
          dir.includes('vendor') && (ext === '.css' || ext === '.scss')
        ));
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'mainData',
      chunks: ['mainApp'],
      minChunks: ({ resource = '' }) => (path.extname(resource) === '.json'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'mainImage',
      chunks: ['mainApp'],
      minChunks: ({ resource = '' }) => (
        path.dirname(resource).includes('main/images') ||
        path.extname(resource) === '.mp3'
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'projectData',
      chunks: ['projectApp'],
      minChunks: ({ resource = '' }) => (path.extname(resource) === '.json'),
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
      name: 'manifest',
      minChunks: Infinity,
    }),
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
