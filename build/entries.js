import { CHUNK_NAMES } from './config.js';


const entries = (DEBUG = true) => {
  const chunkNames = CHUNK_NAMES(DEBUG);
  const entry = {
    [chunkNames.main]: [
      'web-animations-js/web-animations.min.js',
      'bootstrap-loader',
      './applications/main/index.jsx',
    ],
    [chunkNames.project]: [
      'web-animations-js/web-animations.min.js',
      'bootstrap-loader',
      './applications/project/index.jsx',
    ],
    [chunkNames.error]: './applications/error/index.jsx',
  };

  if (DEBUG) {
    [entry.main, entry.project].forEach((chunk) => {
      // chunk.unshift('preact/devtools');
      chunk.unshift('webpack-hot-middleware/client?reload=true');
    });
  }
  return entry;
};


export default entries;
