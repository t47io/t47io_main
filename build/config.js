import path from 'path';

import serverJSON from '../config/server.json';


export const MANIFEST_JS = 'scripts/f.012345.min.js';
export const ASSET_FILE_NAME = (dir = '', DEBUG) => {
  if (DEBUG) {
    return '[name].[ext]';
  }
  return (resource) => {
    const filename = path.basename(resource);
    return `${dir}/${filename.slice(0, 1)}.[hash:6].[ext]`;
  };
};

export const CHUNKS = {
  mainApp: 'm',
  mainData: 'd',
  mainImage: 'i',
  projectApp: 'p',
  projectData: 'r',
  vendor: 'v',
  manifest: 'f',
};
export const CSS_CHUNKS = [
  'mainApp',
  'projectApp',
  'vendor',
];
export const MAIN_CHUNKS = [
  'vendor',
  'mainData',
  'mainImage',
  'mainApp',
];
export const PROJECT_CHUNKS = [
  'vendor',
  'projectData',
  'projectApp',
];

export const getChunkName = (chunk, DEBUG = true) => (
  DEBUG ? chunk : CHUNKS[chunk]
);
export const getChunkFileName = (chunk, DEBUG = true, isCSS = false) => {
  if (!DEBUG && chunk === 'manifest') {
    return MANIFEST_JS;
  }
  const chunkName = getChunkName(chunk, DEBUG);
  const ext = isCSS ? 'css' : 'js';
  const hash = isCSS ? 'content' : 'chunk';
  const dir = isCSS ? 'styles' : 'scripts';
  return DEBUG ? `${chunkName}.${ext}` : `${dir}/${chunkName}.[${hash}hash:6].min.${ext}`;
};
export const CHUNK_FILENAME_MAP = (DEBUG = true, isCSS = false) => (
  Object.keys(CHUNKS).map(key => ({
    [key]: getChunkFileName(key, DEBUG, isCSS),
  }))
  .reduce((obj, item) => ({
    ...obj,
    ...item,
  }), {})
);

export const GZIP_FILE_TYPES = ['html', 'js', 'css', 'map', 'eot', 'ttf', 'woff', 'woff2', 'mp3', 'svg', 'xml', 'txt'];


export const GA_TRACKER = `
  <script type="application/javascript">
    window.GoogleAnalyticsObject='ga';window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
    ga('create','${serverJSON.ga}','auto');
    ga('set', 'transport','beacon');ga('send','pageview');
  </script>
  <script type="application/javascript"
    src="https://www.google-analytics.com/analytics.js"
    async defer>
  </script>
`;

export const IE9_SHIM = `
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
`;

export const HTML_MINIFIER = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
};
export const HTML_TEMPLATE = 'applications/index.html';
export const BG_RNA_SVG = 'applications/loading/images/bg_rna.svg';

export const SITEMAP_HEAD = {
  xmlns: 'https://www.sitemaps.org/schemas/sitemap/0.9',
  xsi: 'https://www.w3.org/2001/XMLSchema-instance',
  schemaLocation: 'sitemap.xsd',
};
