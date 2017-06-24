import React from 'react';
import DocumentMeta from 'react-document-meta';

import { mainMeta } from '../../main/components/Meta.jsx';
import {
  HOST,
  LINK,
  TITLE,
  DESCRIPTION,
} from '../../config.js';


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
