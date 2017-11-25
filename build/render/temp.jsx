import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import Helix from '../../applications/loading/components/Helix.jsx';
import Hexagon from '../../applications/loading/components/Hexagon.jsx';

import MainMeta from '../../applications/main/components/Meta.jsx';
import ProjectMeta from '../../applications/project/components/Meta.jsx';


const helixHTML = renderToStaticMarkup(<Helix />);
const hexagonHTML = renderToStaticMarkup(<Hexagon />);

let mainMETA = renderToStaticMarkup(<MainMeta />);
mainMETA = DocumentMeta.renderAsHTML();
let projectMETA = renderToStaticMarkup(<ProjectMeta />);
projectMETA = DocumentMeta.renderAsHTML();

const render = () => ({
  'tmp/_helix.html': helixHTML,
  'tmp/_hexagon.html': hexagonHTML,
  'tmp/_mainMeta.html': mainMETA,
  'tmp/_projectMeta.html': projectMETA,
});


export default render;
