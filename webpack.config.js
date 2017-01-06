'use strict';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
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
  new LodashModuleReplacementPlugin(),
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
  // 'font-awesome-loader!./font-awesome.config.js',
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
      "react-dom": "preact-compat"
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
      {
        test: /\.json$/i,
        loader: "json",
        exclude: /public\/data/
        // include: [`${__dirname}/public/config.json`]
      }
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

