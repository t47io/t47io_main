import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';

import aliases from './build/aliases.js';
import loaders from './build/loaders.js';
import { PUBLIC_PATH } from './server/env.js';


const config = {
  entry: {
    main: './build/render/server.jsx',
  },
  output: {
    filename: 'ssr.min.js',
    path: PUBLIC_PATH,
    publicPath: '/',
    libraryTarget: 'umd',
  },

  devtool: 'cheap-module-source-map',
  resolve: { alias: aliases() },

  module: { rules: loaders(false, true) },
  plugins: [
    new ExtractTextPlugin({
      filename: 'ssr.min.css',
      allChunks: true,
    }),
    new StaticSiteGeneratorPlugin({
      entry: 'main',
      paths: ['/'],
      globals: {
        window: {},
        document: {},
      },
    }),
  ],
};


export default config;
