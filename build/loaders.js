import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import ExtractCSSPlugin from 'mini-css-extract-plugin';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { ASSET_FILE_NAME } from './config.js';
import { getThemeColor } from './render/util.js';


const loaders = (DEBUG = true, SSR = false) => {
  const loader = [{
    test: /\.js(x)?$/,
    exclude: /node_module/,
    use: {
      loader: 'babel-loader',
      options: { cacheDirectory: DEBUG },
    },
  }, {
    test: /\.scss$/,
    use: [
      ExtractCSSPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: DEBUG ? '[local]' : '__[hash:6]',
        },
      },
      {
        loader: 'postcss-loader',
        options: { plugins: () => ([autoprefixer, csso]) },
      },
      {
        loader: 'resolve-url-loader',
        options: {
          debug: DEBUG,
          sourceMap: false,
        },
      },
      'fix-global-font-face-loader',
      {
        loader: 'sass-loader',
        options: {
          data: getThemeColor(),
          sourceMap: true,
        },
      },
    ],
  }, {
    test: /\.woff$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 25600,
        mimetype: 'application/x-font-woff',
        name: ASSET_FILE_NAME('fonts', DEBUG),
      },
    },
  }, {
    test: /\.(woff2|ttf|eot)$/,
    use: {
      loader: 'file-loader',
      options: { name: ASSET_FILE_NAME('fonts', DEBUG) },
    },
  }, {
    test: /\.(png|jpg|mp3)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 25600,
        name: ASSET_FILE_NAME('media', DEBUG),
      },
    },
  }, {
    test: /\.svg$/,
    oneOf: [{
      include: [
        /brands/,
        /logo/,
        /fa-/,
        /avatar\.svg$/,
      ],
      use: [{
        loader: 'babel-loader',
        options: { cacheDirectory: DEBUG },
      }, {
        loader: 'react-svg-loader',
        options: { jsx: true },
      }],
    }, {
      use: {
        loader: 'svg-url-loader',
        options: {
          limit: -1,
          noquotes: true,
        },
      },
    }],
  }];

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
