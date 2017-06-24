import React from 'react';
import DocumentMeta from 'react-document-meta';

import {
  HOST,
  LINK,
  META,
  TITLE,
  DESCRIPTION,
} from '../../config.js';


export const mainMeta = {
  ...META,
  name: {
    ...META.name,
    keywords: 'Siqi Tian, Portfolio, Personal Website, Design, RNA, Full-Stack Developer, t47io',
  },
};

const Meta = () => (
  <DocumentMeta
    title={TITLE}
    description={DESCRIPTION}
    meta={mainMeta}
    link={LINK}
    canonical={HOST}
  />
);


export default Meta;
