const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	styleLoader: ExtractTextPlugin.extract('css!sass'),
  styles: {
    'mixins': false,
    'bordered-pulled': false,
    'core': true,
    'fixed-width': true,
    'icons': true,
    'larger': true,
    'list': false,
    'path': false,
    'rotated-flipped': false,
    'animated': false,
    'stacked': true
  }
};
