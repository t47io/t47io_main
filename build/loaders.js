import ExtractTextPlugin from 'extract-text-webpack-plugin';


const loaders = (SSR = false) => {
  const loader = [
    {
      test: /\.js(x)?$/i,
      exclude: /node_module/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
        },
      },
    },
    {
      test: /\.scss$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      }),
    },
    {
      test: /\.woff$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 25600,
          mimetype: 'application/x-font-woff',
          name: 'font/[hash:6].[ext]',
        },
      },
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 25600,
          name: 'image/[hash:6].[ext]',
        },
      },
    },
    {
      test: /\.svg$/i,
      use: {
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false,
          mimetype: 'image/svg+xml',
        },
      },
    },
  ];

  if (SSR) {
    loader.unshift({
      test: /(web-animations-js|preact-css-transition-group)/,
      use: {
        loader: 'ignore-loader',
      },
    });
  }
  return loader;
};


export default loaders;
