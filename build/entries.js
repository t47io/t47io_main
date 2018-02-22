const entries = (DEBUG = true) => {
  const entry = {
    mainApp: [
      'web-animations-js/web-animations.min.js',
      'bootstrap-loader',
      './applications/main/index.jsx',
    ],
    projectApp: [
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
