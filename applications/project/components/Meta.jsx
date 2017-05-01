import React from 'react';
import DocumentMeta from 'react-document-meta';

import {
  HOST,
  LINK,
} from '../../common/constants/util.js';
import { mainMeta } from '../../main/components/Meta.jsx';


const Meta = () => (
  <DocumentMeta
    title="SIQI TIAN - Porftolio | T47.IO"
    description="Personal portfolio of Siqi Tian, a full-stack web designer and developer, as well as an RNA biochemist (PhD) from Stanford University."
    meta={mainMeta}
    link={LINK}
    canonical={`${HOST}/project`}
  />
);


export default Meta;
