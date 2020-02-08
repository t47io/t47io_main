import htmlMinifier from 'html-minifier';

import { HTML_MINIFIER } from '../config.js';
import {
  replaceHtml,
  loadFileSync,
} from './util.js';


export const renderMainHTML = (baseHTML) => {
  const mainMETA = loadFileSync('public/tmp/_mainMeta.html');
  const helixHTML = loadFileSync('public/tmp/_helix.html');
  const helixCSS = loadFileSync('public/tmp/_helix.css');

  return htmlMinifier.minify(
    replaceHtml(
      baseHTML
      .replace('<meta />', mainMETA)
      .replace('<loader />', helixHTML)
      .replace('html{}', helixCSS)
    ), HTML_MINIFIER
  );
};

export const renderProjectHTML = (baseHTML) => {
  const projectMETA = loadFileSync('public/tmp/_projectMeta.html');
  const hexagonHTML = loadFileSync('public/tmp/_hexagon.html');
  const hexagonCSS = loadFileSync('public/tmp/_hexagon.css');

  return htmlMinifier.minify(
    replaceHtml(
      baseHTML
      .replace('<meta />', projectMETA)
      .replace('<loader />', hexagonHTML)
      .replace('html{}', hexagonCSS)
    ), HTML_MINIFIER
  );
};

export const renderErrorHtml = (baseHTML, bodyHTML, bodyMETA, bodyCSS) => (
  htmlMinifier.minify(
    replaceHtml(
      baseHTML
      .replace('<meta />', bodyMETA)
      .replace('<app />', bodyHTML)
      .replace('{style}', bodyCSS)
    )
    .replace(/data-rdm/g, ''),
    HTML_MINIFIER
  )
);
