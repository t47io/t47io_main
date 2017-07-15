import { CHUNK_NAMES } from './config.js';


const entries = (DEBUG = true) => {
  const chunkNames = CHUNK_NAMES(DEBUG);
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
      'redux-logger',
      'redux-thunk',
      'smoothscroll',
      'web-animations-js',
      'whatwg-fetch',
    ],
  };

  if (DEBUG) {
    [entry.main, entry.project].forEach((chunk) => {
      chunk.unshift('webpack-hot-middleware/client?reload=true');
      chunk.unshift('preact/devtools');
    });
  }
  return entry;
};


export default entries;
