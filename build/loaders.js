import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { ASSET_FILE_NAME } from './config.js';
import { getThemeColor } from './render/util.js';


const loaders = (DEBUG = true, SSR = false) => {
  const loader = [
    {
      test: /\.js(x)?$/,
      exclude: /node_module/,
      use: {
        loader: 'babel-loader',
        options: { cacheDirectory: DEBUG },
      },
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?importLoaders=1',
          {
            loader: 'postcss-loader',
            options: { plugins: () => ([autoprefixer, csso]) },
          },
          'resolve-url-loader?-sourceMap',
          {
            loader: 'sass-loader',
            options: {
              data: getThemeColor(),
              sourceMap: true,
            },
          },
        ],
      }),
    },
    {
      test: /\.woff$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 25600,
          mimetype: 'application/x-font-woff',
          name: ASSET_FILE_NAME('fonts'),
        },
      },
    },
    {
      test: /\.(woff2|ttf|eot)$/,
      use: {
        loader: 'file-loader',
        options: { name: ASSET_FILE_NAME('fonts') },
      },
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 25600,
          name: ASSET_FILE_NAME('images'),
        },
      },
    },
    {
      test: /\.svg$/,
      use: {
        loader: 'svg-url-loader',
        options: { limit: -1, noquotes: true },
      },
    },
    {
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
        options: { name: ASSET_FILE_NAME('audio') },
      },
    },
  ];

  if (SSR) {
    loader.unshift({
      test: /web-animations-js/,
      use: { loader: 'null-loader' },
    });
  } else if (!DEBUG) {
    loader.unshift({
      test: /redux-logger/,
      use: { loader: 'null-loader' },
    });
  }
  return loader;
};


export default loaders;
