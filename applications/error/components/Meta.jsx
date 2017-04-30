import React from 'react';
import DocumentMeta from 'react-document-meta';

import {
  HOST,
  LINK,
  META,
} from '../../common/constants/util.js';


const errorMeta = {
  ...META,
  name: {
    ...META.name,
    keywords: 'Siqi Tian, Personal Website, Error Page, t47io',
  },
};

const Meta = () => (
  <DocumentMeta
    title="SIQI TIAN - Full-Stack Web Developer & RNA Biochemistry Automator | T47.IO"
    description="Custom HTTP error page for https://t47.io/, the personal portfolio of Siqi Tian."
    meta={errorMeta}
    link={LINK}
    canonical={HOST}
  />
);


export default Meta;
