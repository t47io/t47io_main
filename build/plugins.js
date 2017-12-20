import glob from 'glob';
import path from 'path';
import webpack from 'webpack';

import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
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
      chunks: [
        chunkNames.mainApp,
        chunkNames.mainImage,
        chunkNames.vendor,
        chunkNames.manifest,
      ],
      template: path.join(ROOT, HTML_TEMPLATE),
      filename: path.join(PATH.PUBLIC, 'main.html'),
      inject: false,
      args: {
        js: [
          chunkNames.vendor,
          chunkNames.mainImage,
          chunkNames.mainApp,
        ],
        css: [
          chunkNames.vendor,
          chunkNames.mainApp,
        ],
        manifest: MANIFEST_JS,
        debug: DEBUG,
      },
    }),
    new HtmlWebpackPlugin({
      chunks: [
        chunkNames.projectApp,
        chunkNames.vendor,
        chunkNames.manifest,
      ],
      template: path.join(ROOT, HTML_TEMPLATE),
      filename: path.join(PATH.PUBLIC, 'project.html'),
      inject: false,
      args: {
        js: [
          chunkNames.vendor,
          chunkNames.projectApp,
        ],
        css: [
          chunkNames.vendor,
          chunkNames.projectApp,
        ],
        manifest: MANIFEST_JS,
        debug: DEBUG,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: chunkNames.vendor,
      filename: CHUNK_FILE_NAME(DEBUG),
      minChunks: module => (
        module.resource && !module.resource.includes('frappe') && (
          module.resource.includes('node_modules/') ||
          (module.resource.includes('applications/vendor/') && module.resource.endsWith('css'))
        )
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: chunkNames.mainImage,
      filename: CHUNK_FILE_NAME(DEBUG),
      chunks: [chunkNames.mainApp],
      minChunks: module => (
        module.resource && (
          module.resource.includes('applications/main/images/') ||
          module.resource.endsWith('mp3')
        )
      ),
    }),
    new ExtractTextPlugin({
      filename: CHUNK_FILE_NAME(DEBUG, 'css'),
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
