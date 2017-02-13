import ExtractTextPlugin from 'extract-text-webpack-plugin';


const Loaders = () => {
  return [
    {
      test: /\.js(x)?$/i,
      loader: "eslint-loader",
      enforce: 'pre',
      exclude: [
        /node_modules/,
        /public/
      ]
    },
    {
      test: /\.js(x)?$/i,
      include: /app/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }
    },
    {
      test: /\.scss$/i,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          "css-loader",
          "sass-loader"
        ]
      })
    },
    {
      test: /\.woff$/i,
      use: {
        loader: "url-loader",
        options: {
          limit: 25600,
          mimetype: "application/x-font-woff",
          name: "font/[hash:8].[ext]"
        }
      }
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: {
        loader: "url-loader",
        options: {
          limit: 25600,
          name: "image/[hash:8].[ext]"
        }
      }
    },
    {
      test: /\.svg$/i,
      use: {
        loader: "svg-inline-loader",
        options: {
          removeSVGTagAttrs: false,
          mimetype: "image/svg+xml"
        }
      }
    },
    // {
    //   test: /\.json$/i,
    //   loader: "json-loader",
    //   exclude: /public\/data/
    // }
  ];
};


export default Loaders;
