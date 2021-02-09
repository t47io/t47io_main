import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import ErrorPage from '../../applications/error/containers/ErrorPage.jsx';
import ErrorMeta from '../../applications/error/components/Meta.jsx';

import errorJSON from '../../config/error.json';


const codes = Object.keys(errorJSON).map(code => parseInt(code, 10));
const errorHTMLs = Object.fromEntries(
  codes.map(code => ([
    `tmp/_err${code}.html`,
    renderToStaticMarkup((
      <ErrorPage
        {...(errorJSON[code])}
        code={code}
      />
    )),
  ]))
);

let errorMETA = renderToStaticMarkup(<ErrorMeta />);
errorMETA = DocumentMeta.renderAsHTML();

const render = () => ({
  ...errorHTMLs,
  'tmp/_errorMeta.html': errorMETA.replace(/data-rdm/g, ''),
});


export default render;
