import path from 'path';

import { PUBLIC_PATH } from '../server/env.js';

import serverJSON from '../config/server.json';


export const ROOT_PATH = path.join(PUBLIC_PATH, '../');

export const MANIFEST_JS = 'scripts/f.012345.min.js';
export const CHUNK_FILE_NAME = (DEBUG = true, ext = 'js') => {
  const dir = (ext === 'js') ? 'scripts' : 'styles';
  const name = DEBUG ? '[name]' : '[name].[chunkhash].min';
  return `${dir}/${name}.${ext}`;
};
export const ASSET_FILE_NAME = (dir = '') => (`${dir}/[hash:6].[ext]`);

const CHUNK_NAME = (chunk, DEBUG = true) => (
  DEBUG ? chunk : chunk.slice(0, 1)
);
export const CHUNK_NAMES = (DEBUG = true) => ({
  main: CHUNK_NAME('main', DEBUG),
  project: CHUNK_NAME('project', DEBUG),
  error: CHUNK_NAME('error', DEBUG),
  vendor: CHUNK_NAME('vendor', DEBUG),
  manifest: DEBUG ? 'manifest' : 'f',
  data: CHUNK_NAME('data', DEBUG),
  repo: CHUNK_NAME('repo', DEBUG),
});

export const GZIP_FILE_TYPES = ['html', 'js', 'css', 'map', 'eot', 'ttf', 'woff', 'woff2', 'mp3', 'xml', 'txt'];


export const GA_TRACKER = `
  <script type="application/javascript">
    window.GoogleAnalyticsObject='ga';window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
    ga('create','${serverJSON.ga}','auto');
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
export const HTML_TEMPLATE = path.join(ROOT_PATH, 'applications/index.html');

export const SITEMAP_HEAD = {
  xmlns: 'https://www.sitemaps.org/schemas/sitemap/0.9',
  xsi: 'https://www.w3.org/2001/XMLSchema-instance',
  schemaLocation: 'sitemap.xsd',
};

export const THEMES = [
  'green',
  'cyan',
  'purple',
];
