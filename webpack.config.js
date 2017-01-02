'use strict';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import purify from 'purifycss-webpack-plugin';

const DEBUG = !((process.argv.indexOf('--production') > 0) || (process.argv.indexOf('-p') > 0) || (process.env.npm_lifecycle_event === 'build'));
console.log(`DEBUG mode ? ${DEBUG}`);


let plugin = [
  new HtmlWebpackPlugin({
    template: `${__dirname}/app/index.html`,
    filename: `${__dirname}/public/index.html`,
    inject: 'body',
  }),
  new ExtractTextPlugin(`[name]-[hash:8].${DEBUG ? "" : "min."}css`, {
    allChunks: true
  }),
  new purify({
    basePath: __dirname,
    paths: [
      'app/**/*.jsx',
      'app/**/*.json',
      'public/index.html'
    ],
    purifyOptions: {minify: !DEBUG}
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin()
];
if (!DEBUG) {
  plugin = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BABEL_ENV': JSON.stringify('production')
      }
    }),
    ...(plugin),
    new BabiliPlugin({
      comments: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: false,
      compress: {
        warnings: false,
        drop_console: true
      },
      mangle: {
        except: ['$'],
        screw_ie8: true,
        keep_fnames: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.2
    })
  ];
} else {
  plugin = [
    plugin[0],
    new webpack.HotModuleReplacementPlugin(),
    ...(plugin.slice(1))
  ];
}

let entry = DEBUG ? ['webpack-hot-middleware/client?reload=true'] : [];
entry = entry.concat([
  'bootstrap-sass-loader!./bootstrap-sass.config.js',
  'font-awesome-loader!./font-awesome.config.js',
  `${__dirname}/app/index.jsx`
]);


const config = {
  entry: entry,
  output: {
    filename: `main-[hash:8].${DEBUG ? "" : "min."}js`,
    path: `${__dirname}/public`,
    publicPath: "/"
  },

  devtool: `cheap-module-${DEBUG ? "eval-" : ""}source-map`,
  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      // "lodash": "underscore"
    }
  },

  module: {
    // preLoaders: [
    //   {
    //     test: /\.js?$/,
    //     loader: "eslint-loader",
    //     include: `${__dirname}/src`
    //   }
    // ],
    loaders: [
      {
        test: /\.js(x)?$/,
        loader: "babel",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file?emitFile=false&name=[path][name].[ext]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: "file?name=[path][name].[ext]"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
      // {
      //   test: /bootstrap-sass\/assets\/javascripts\//,
      //   loader: 'imports?jQuery=jquery'
      // },
    ]
  },
  plugins: plugin,

  // devServer: {
  //   inline: true,
  //   port: 9000,
  //   historyApiFallback: true
  // }
};


export default config;

