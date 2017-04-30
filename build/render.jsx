import sass from 'node-sass';
import path from 'path';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Helix from '../applications/loading/components/Helix.jsx';
import Hexagon from '../applications/loading/components/Hexagon.jsx';

const env = require('../config/server.json');

const googleAnalytics = { trackingID: env.gaTracker };
const htmlMinify = {
  collapseWhitespace: true,
  minifyJS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
};

const cubeLoading = {
  CSS: sass.renderSync({
    file: path.join(__dirname, '../applications/loading/stylesheets/project.scss'),
    outputStyle: 'compressed',
  }).css.toString(),
  HTML: renderToStaticMarkup(<Hexagon />),
};
const helixLoading = {
  CSS: sass.renderSync({
    file: path.join(__dirname, '../applications/loading/stylesheets/main.scss'),
    outputStyle: 'compressed',
  }).css.toString(),
  HTML: renderToStaticMarkup(<Helix />),
};


export {
  cubeLoading,
  helixLoading,
  googleAnalytics,
  htmlMinify,
};
