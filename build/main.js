import colors from 'colors';
import fs from 'fs';
import htmlMinifier from 'html-minifier';
import path from 'path';


const re = /manifest-[0-9a-f]{8}/;
const loadFileSync = filename => fs.readFileSync(path.join(__dirname, filename), 'utf8');

try {
  const baseHTML = loadFileSync('../public/index.html');
  const manifestHash = baseHTML.match(re)[0];
  const manifestJS = loadFileSync(`../public/${manifestHash}.js`);

  const finalHTML = htmlMinifier.minify(
    baseHTML
    .replace(/<link href="\/[0-9a-f]{8}\.min\.css" rel="stylesheet"><\/head>/g, '')
    .replace(/<script type="text\/javascript" src="\/(manifest-)?[0-9a-f]{8}\.(min\.)?js"><\/script>/g, '')
    .replace(/src="\/manifest-[0-9a-f]{8}\.js">/, `>${manifestJS}`), {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    }
  );

  fs.writeFileSync(path.join(__dirname, '../public/index.html'), finalHTML, 'utf8');
  console.log(`${colors.green('SUCCESS')}: Index Page manifest JS inlined.`);
} catch (err) {
  console.log(err);
  console.log(`${colors.red('ERROR')}: Failed to inline manifest JS on Index Page.`);
}
