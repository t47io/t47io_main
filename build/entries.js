import {
  CHUNK_MAIN_APP,
  CHUNK_PROJ_APP,
} from './chunks.js';


const entries = (DEBUG = true) => {
  const entry = {
    [CHUNK_MAIN_APP]: [
      'web-animations-js/web-animations.min.js',
      'bootstrap-loader',
      './applications/main/index.jsx',
    ],
    [CHUNK_PROJ_APP]: [
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
