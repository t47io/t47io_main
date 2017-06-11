import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


const loaders = (SSR = false) => {
  const loader = [{
    test: /\.js(x)?$/i,
    exclude: /node_module/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['es2015'],
      },
    },
  }, {
    test: /\.scss$/i,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: false,
            plugins: () => ([autoprefixer]),
          },
        },
        'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }),
  }, {
    test: /\.woff$/i,
    use: {
      loader: 'url-loader',
      options: {
        limit: 25600,
        mimetype: 'application/x-font-woff',
        name: 'font/[hash:6].[ext]',
      },
    },
  }, {
    test: /\.(woff2|ttf|eot)$/i,
    use: {
      loader: 'file-loader',
      options: { name: 'font/[hash:6].[ext]' },
    },
  }, {
    test: /\.(png|jpg|gif)$/i,
    use: {
      loader: 'url-loader',
      options: {
        limit: 25600,
        name: 'image/[hash:6].[ext]',
      },
    },
  }, {
    test: /\.svg$/i,
    use: {
      loader: 'svg-inline-loader',
      options: {
        removeSVGTagAttrs: false,
        mimetype: 'image/svg+xml',
      },
    },
  }, {
    test: /\.mp3$/i,
    use: {
      loader: 'file-loader',
      options: { name: 'audio/[hash:6].[ext]' },
    },
  }];

  if (SSR) {
    loader.unshift({
      test: /(web-animations-js|preact-css-transition-group)/,
      use: { loader: 'null-loader' },
    });
  }
  return loader;
};


export default loaders;
