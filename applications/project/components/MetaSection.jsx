import React from 'react';
import DocumentMeta from 'react-document-meta';

import {
  HOST,
  META,
} from '../../common/constants/util.js';


const MetaSection = ({
  title,
  description,
  project,
}) => {
  const projectMeta = {
    ...META,
    name: {
      ...META.name,
      keywords: `Siqi Tian, Portfolio, ${title}, t47io`,
    },
  };

  return (
    <DocumentMeta
      title={`SIQI TIAN - Porftolio: ${title} | T47.IO`}
      description={`Personal portfolio of Siqi Tian, project ${title}: ${description}`}
      meta={projectMeta}
      canonical={`${HOST}/project/${project}`}
      extend
    />
  );
};

MetaSection.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  project: React.PropTypes.string,
};
MetaSection.defaultProps = {
  title: '',
  description: '',
  project: '',
};


export default MetaSection;
