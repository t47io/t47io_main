const chunkName = (chunk, DEBUG = true) => (
  DEBUG ? chunk : chunk.slice(0, 1)
);

export const getChunkNames = (DEBUG = true) => ({
  main: chunkName('main', DEBUG),
  project: chunkName('project', DEBUG),
  error: chunkName('error', DEBUG),
  vendor: chunkName('vendor', DEBUG),
  manifest: DEBUG ? 'manifest' : 'f',
  config: chunkName('config', DEBUG),
  data: chunkName('data', DEBUG),
  repo: chunkName('repo', DEBUG),
});

const entries = (DEBUG = true) => {
  const chunkNames = getChunkNames(DEBUG);
  const entry = {
    [chunkNames.main]: [
      'bootstrap-loader',
      './applications/main/index.jsx',
    ],
    [chunkNames.project]: [
      'bootstrap-loader',
      './applications/project/index.jsx',
    ],
    [chunkNames.error]: './applications/error/index.jsx',
    [chunkNames.vendor]: [
      'bootstrap-loader',
      'react',
      'react-document-meta',
      'react-redux',
      'react-tooltip',
      'react-waypoint',
      'react-web-animation',
      'reduce-reducers',
      'redux',
      'redux-thunk',
      'smoothscroll',
      'web-animations-js',
      'whatwg-fetch',
    ],
  };

  if (DEBUG) {
    entry.main.unshift('webpack-hot-middleware/client?reload=true');
    entry.project.unshift('webpack-hot-middleware/client?reload=true');
  }
  return entry;
};


export default entries;
