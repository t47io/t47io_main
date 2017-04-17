import React from 'react';

import '../stylesheets/FeatureList.scss';


const FeatureListItem = ({
  text,
  link,
}) => {
  if (!link.length) {
    return (
      <li className="PROJECT__feature-item">{text}</li>
    );
  }

  return (
    <li className="PROJECT__feature-item">
      <a
        href={link}
        target="_blank" rel="noopener noreferrer external"
      >
        {text}
      </a>
    </li>
  );
};

FeatureListItem.propTypes = {
  text: React.PropTypes.string,
  link: React.PropTypes.string,
};
FeatureListItem.defaultProps = {
  text: '',
  link: '',
};


export default FeatureListItem;
