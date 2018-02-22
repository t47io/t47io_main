import serverJSON from '../config/server.json';


export const MANIFEST_JS = 'scripts/f.012345.min.js';
export const ASSET_FILE_NAME = (dir = '') => (`${dir}/[hash:6].[ext]`);

const CHUNKS = {
  mainApp: 'main',
  mainData: 'data',
  mainImage: 'image',
  projectApp: 'project',
  projectData: 'repo',
  vendor: 'vendor',
  manifest: 'manifest',
};
const CHUNK_NAME = (chunk, DEBUG = true, isCSS = false) => {
  if (!DEBUG && chunk === 'manifest') {
    return MANIFEST_JS;
  }
  const chunkName = DEBUG ? chunk : chunk.slice(0, 1);
  const ext = isCSS ? 'css' : 'js';
  const hash = isCSS ? '[contenthash:6]' : '[chunkhash]';
  const dir = isCSS ? 'styles' : 'scripts';
  const prefix = `${dir}/${chunkName}`;
  return DEBUG ? `${prefix}.${ext}` : `${prefix}.${hash}.min.${ext}`;
};
export const CHUNK_NAMES = (DEBUG = true, isCSS = false) => (
  Object.keys(CHUNKS).map(key => ({
    [key]: CHUNK_NAME(CHUNKS[key], DEBUG, isCSS),
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
