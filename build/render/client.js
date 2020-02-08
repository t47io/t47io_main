import htmlMinifier from 'html-minifier';

import { HTML_MINIFIER } from '../config.js';
import {
  replaceHtml,
  loadFile,
} from './util.js';


export const renderMainHtml = async (baseHTML) => {
  const mainMETA = await loadFile('public/tmp/_mainMeta.html');
  const helixHTML = await loadFile('public/tmp/_helix.html');
  const helixCSS = await loadFile('public/tmp/_helix.css');

  return htmlMinifier.minify(
    replaceHtml(
      baseHTML
      .replace('<meta />', mainMETA)
      .replace('<loader />', helixHTML)
      .replace('html{}', helixCSS)
    ), HTML_MINIFIER
  );
};

export const renderProjectHtml = async (baseHTML) => {
  const projectMETA = await loadFile('public/tmp/_projectMeta.html');
  const hexagonHTML = await loadFile('public/tmp/_hexagon.html');
  const hexagonCSS = await loadFile('public/tmp/_hexagon.css');

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
