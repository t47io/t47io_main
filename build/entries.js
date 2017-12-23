import { CHUNK_NAMES } from './config.js';


const entries = (DEBUG = true) => {
  const chunkNames = CHUNK_NAMES(DEBUG);
  const entry = {
    [chunkNames.mainApp]: [
      'web-animations-js/web-animations.min.js',
      'bootstrap-loader',
      './applications/main/index.jsx',
    ],
    [chunkNames.projectApp]: [
      'bootstrap-loader',
      './applications/project/index.jsx',
    ],
  };

  if (DEBUG) {
    Object.keys(entry).forEach((key) => {
      // chunk.unshift('preact/devtools');
      entry[key].unshift('webpack-hot-middleware/client?reload=true');
    });
  }
  return entry;
};


export default entries;
