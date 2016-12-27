const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const express = require('express');

const config = require('../webpack.config.js');
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const isProduction = false;
const port = 3000;
const publicPath = path.resolve(__dirname, '../public');


if (!isProduction) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    index: "index.html",

    noInfo: false,
    quiet: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    serverSideRender: false,
    stats: {
      colors: true
    }
	});

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', function(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../public/index.html')));
    res.end();
  });
} else {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}


app.listen(port, function() {
  console.log('Server running on port ' + port);
});
