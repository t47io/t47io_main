import fs from 'fs';
import path from 'path';
import sass from 'node-sass';


export const loadFileSync = filename => (
  fs.readFileSync(path.join(__dirname, '../../', filename), 'utf8')
);

export const saveFileSync = (filename, content) => (
  fs.writeFileSync(path.join(__dirname, '../../', filename), content, 'utf8')
);

export const renderSassSync = filename => (
  sass.renderSync({
    file: path.join(__dirname, '../../', filename),
  }).css.toString()
);

export const loadImageSync = (filename) => {
  const png = fs.readFileSync(
    path.join(__dirname, '../../', filename)
  ).toString('base64');
  return `data:image/png;base64,${png}`;
};
