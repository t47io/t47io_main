import React from 'react';
import DocumentMeta from 'react-document-meta';

import {
  HOST,
  LINK,
  TITLE,
  DESCRIPTION,
} from '../../common/constants/util.js';
import { mainMeta } from '../../main/components/Meta.jsx';


const Meta = () => (
  <DocumentMeta
    title={TITLE}
    description={DESCRIPTION}
    meta={mainMeta}
    link={LINK}
    canonical={`${HOST}/project`}
  />
);


export default Meta;
