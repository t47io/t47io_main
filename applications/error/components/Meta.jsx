import React from 'react';
import DocumentMeta from 'react-document-meta';

import {
  HOST,
  LINK,
  META,
  TITLE,
} from '../../config.js';


const errorMeta = {
  ...META,
  name: {
    ...META.name,
    keywords: 'Siqi Tian, Personal Website, Error Page, t47io',
  },
};

const Meta = () => (
  <DocumentMeta
    title={TITLE}
    description={`Custom HTTP error page for ${HOST}, the personal portfolio of Siqi Tian.`}
    meta={errorMeta}
    link={LINK}
    canonical={HOST}
  />
);


export default Meta;
