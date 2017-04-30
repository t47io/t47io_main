import React from 'react';
import DocumentMeta from 'react-document-meta';

import {
  HOST,
  LINK,
  META,
} from '../../common/constants/util.js';


const mainMeta = {
  ...META,
  name: {
    ...META.name,
    keywords: 'Siqi Tian, Portfolio, Personal Website, Design, RNA, Full-Stack Developer, t47io',
  },
};

const Meta = () => (
  <DocumentMeta
    title="SIQI TIAN - Full-Stack Web Developer & RNA Biochemistry Automator | T47.IO"
    description="Personal portfolio of Siqi Tian, a full-stack web designer and developer, as well as an RNA biochemist (PhD) from Stanford University."
    meta={mainMeta}
    link={LINK}
    canonical={HOST}
  />
);


export default Meta;
