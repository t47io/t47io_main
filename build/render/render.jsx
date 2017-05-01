import htmlMinifier from 'html-minifier';
import purify from 'purify-css';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import Helix from '../../applications/loading/components/Helix.jsx';
import Hexagon from '../../applications/loading/components/Hexagon.jsx';
import MainMeta from '../../applications/main/components/Meta.jsx';
import ProjectMeta from '../../applications/project/components/Meta.jsx';

import {
  GA_TRACKER,
  IE9_SHIM,
  HTML_MINIFIER,
} from './config.js';
import { renderSassSync } from './util.js';


const helixHTML = renderToStaticMarkup(<Helix />);
const hexagonHTML = renderToStaticMarkup(<Hexagon />);

const mainCSS = purify(
  helixHTML,
  renderSassSync('applications/loading/stylesheets/main.scss'),
  { minify: true }
);
const projectCSS = purify(
  hexagonHTML,
  renderSassSync('applications/loading/stylesheets/project.scss'),
  { minify: true }
);


const replaceHTML = inputHTML => (
  inputHTML
    .replace('<meta data-rdm/>', '<meta charset="utf-8" data-rdm />')
    .replace('<ga />', `${GA_TRACKER}${IE9_SHIM}`)
    .replace('[object Object]', '')
);

export const renderMainHTML = (baseHTML) => {
  let mainMETA = renderToStaticMarkup(<MainMeta />);
  mainMETA = DocumentMeta.renderAsHTML();

  return htmlMinifier.minify(
    replaceHTML(baseHTML
      .replace('<meta />', mainMETA)
      .replace('<loader />', helixHTML)
      .replace('html{}', mainCSS)
    ), HTML_MINIFIER
  );
};

export const renderProjectHTML = (baseHTML) => {
  let projectMETA = renderToStaticMarkup(<ProjectMeta />);
  projectMETA = DocumentMeta.renderAsHTML();

  return htmlMinifier.minify(
    replaceHTML(baseHTML
      .replace('<meta />', projectMETA)
      .replace('<loader />', hexagonHTML)
      .replace('html{}', projectCSS)
    ), HTML_MINIFIER
  );
};

export const renderErrorHTML = (baseHTML, bodyHTML, rawCSS) => {
  const errorMETA = DocumentMeta.renderAsHTML();
  const cleanCSS = purify(bodyHTML, rawCSS, { minify: true });

  return htmlMinifier.minify(
    replaceHTML(baseHTML
      .replace('<meta />', errorMETA)
      .replace('<loader />', '')
      .replace('<div class="body" id="app"></div>', bodyHTML)
      .replace('html{}', cleanCSS)
    )
    .replace(/data-rdm/g, '')
    .replace(/<script type="application\/javascript" src="\/(manifest|error)?(-)?[0-9a-f]{8}\.(min\.)?js"><\/script>/g, ''),
    HTML_MINIFIER
  );
};
