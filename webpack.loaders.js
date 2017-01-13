import ExtractTextPlugin from 'extract-text-webpack-plugin';


const Loaders = () => {
  return [
    {
      test: /\.js(x)?$/i,
      loader: "babel-loader",
      include: /app/
    },
    {
      test: /\.scss$/i,
      loader: ExtractTextPlugin.extract("css-loader!sass-loader")
    },
    {
      test: /\.woff$/i,
      loader: "url-loader",
      query: {
        limit: 25600,
        mimetype: "application/x-font-woff",
        name: "font/[hash:8].[ext]"
      }
    },
    {
      test: /\.(png|jpg|gif)$/i,
      loader: "url-loader",
      query: {
        limit: 25600,
        name: "image/[hash:8].[ext]"
      }
    },
    {
      test: /\.svg$/i,
      loader: "svg-inline-loader",
      query: {
        removeSVGTagAttrs: false,
        mimetype: "image/svg+xml"
      }
    },
    {
      test: /\.json$/i,
      loader: "json-loader",
      exclude: /public\/data/
    }
  ];
};


export default Loaders;
