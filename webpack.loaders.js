import ExtractTextPlugin from 'extract-text-webpack-plugin';


const Loaders = () => {
  return [
    {
      test: /\.js(x)?$/i,
      loader: "babel",
      include: /app/
    },
    {
      test: /\.scss$/i,
      loader: ExtractTextPlugin.extract('css!sass')
    },
    {
      test: /\.woff$/i,
      loader: "url",
      query: {
        limit: 25600,
        mimetype: "application/x-font-woff",
        name: "font/[hash:8].[ext]"
      }
    },
    {
      test: /\.(png|jpg|gif)$/i,
      loader: "url",
      query: {
        limit: 25600,
        name: "image/[hash:8].[ext]"
      }
    },
    {
      test: /\.svg$/i,
      loader: "svg-inline",
      query: {
        removeSVGTagAttrs: false,
        mimetype: "image/svg+xml"
      }
    },
    // {
    //   test: /\.json$/i,
    //   loader: "json",
    //   exclude: /public\/data/
    // }
  ];
};


export default Loaders;
