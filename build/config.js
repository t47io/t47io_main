import path from 'path';

import { PUBLIC_PATH } from '../server/env.js';

const { ga } = require('../config/server.json');


export const ROOT_PATH = path.join(PUBLIC_PATH, '../');
export const MANIFEST_JS = 'f.012345.min.js';

export const GA_TRACKER = `
  <script type="application/javascript">
    window.GoogleAnalyticsObject='ga';window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
    ga('create','${ga}','auto');
    ga('set', 'transport','beacon');ga('send','pageview');
  </script>
  <script type="application/javascript"
    src="https://www.google-analytics.com/analytics.js"
    async defer
  ></script>
`;

export const IE9_SHIM = `
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
`;

export const HTML_MINIFIER = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
};
