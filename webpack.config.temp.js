import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';

import aliases from './build/aliases.js';
import loaders from './build/loaders.js';
import { PUBLIC_PATH } from './server/env.js';


const config = {
  entry: [
    './build/render/temp.jsx',
    './build/render/error.jsx',
  ],
  output: {
    filename: 'tmp/_tmp.js',
    path: PUBLIC_PATH,
    publicPath: '/',
    libraryTarget: 'umd',
  },

  devtool: 'cheap-module-source-map',
  resolve: { alias: aliases() },
  module: { rules: loaders(false, true) },
  plugins: [new StaticSiteGeneratorPlugin()],
};


export default config;
