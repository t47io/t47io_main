import sass from 'node-sass';
import path from 'path';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Cube from '../applications/loading/components/Cube.jsx';
import Helix from '../applications/loading/components/Helix.jsx';

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
  HTML: renderToStaticMarkup(<Cube />),
};
const helixLoading = {
  CSS: sass.renderSync({
    file: path.join(__dirname, '../applications/loading/stylesheets/main.scss'),
    outputStyle: 'compressed',
  }).css.toString(),
  HTML: renderToStaticMarkup(<Helix />),
};


const commonMeta = [
  {
    name: 'author',
    content: 'Siqi Tian',
  },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  },
  {
    name: 'robots',
    content: 'noodp, noydir',
  },
];
const indexPage = {
  title: 'SIQI TIAN - Full-Stack Web Developer & RNA Biochemistry Automator | T47.IO',
  meta: [
    {
      name: 'description',
      content: 'Personal portfolio of Siqi Tian, a full-stack web designer and developer, as well as an RNA biochemist (PhD) from Stanford University.',
    },
    {
      name: 'keywords',
      content: 'Siqi Tian, Portfolio, Personal Website, Design, RNA, Full-Stack Developer, t47io',
    },
    ...commonMeta,
  ],
};
const errorPage = {
  title: 'SIQI TIAN - Error Page | T47.IO',
  meta: [
    {
      name: 'description',
      content: 'Custom HTTP error page for http://t47.io/, the personal portfolio of Siqi Tian.',
    },
    {
      name: 'keywords',
      content: 'Siqi Tian, Portfolio, Personal Website, Error Page',
    },
    ...commonMeta,
  ],
};


export {
  indexPage,
  errorPage,
  cubeLoading,
  helixLoading,
  googleAnalytics,
  htmlMinify,
};
