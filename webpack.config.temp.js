import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';

import aliases from './build/aliases.js';
import loaders from './build/loaders.js';
import { PATH } from './server/env.js';


const config = {
  entry: {
    temp: './build/render/temp.jsx',
    error: './build/render/error.jsx',
  },
  output: {
    filename: 'tmp/_tmp.[id].js',
    path: PATH.PUBLIC,
    publicPath: '/',
    libraryTarget: 'umd',
  },

  devtool: 'cheap-module-source-map',
  performance: {
    assetFilter: asset => (asset.includes('.html')),
    maxAssetSize: 10 * 1024,
    maxEntrypointSize: Infinity,
  },
  resolve: {
    alias: aliases(),
    symlinks: false,
  },

  module: { rules: loaders(false, true) },
  plugins: [
    new StaticSiteGeneratorPlugin({ entry: 'temp' }),
    new StaticSiteGeneratorPlugin({ entry: 'error' }),
  ],
};


export default config;
