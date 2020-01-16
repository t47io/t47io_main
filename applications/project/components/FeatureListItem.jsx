import React from 'react';
import PropTypes from 'prop-types';

import { TARGET_BLANK } from '../../common/constants/util.js';

import '../stylesheets/FeatureSection.scss';


const FeatureListItem = ({
  text,
  link,
}) => {
  if (!link.length) {
    return (
      <li styleName="PROJECT__feature-item">{text}</li>
    );
  }

  return (
    <li styleName="PROJECT__feature-item">
      <a href={link} {...TARGET_BLANK}>{text}</a>
    </li>
  );
};

FeatureListItem.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
};
FeatureListItem.defaultProps = {
  text: '',
  link: '',
};


export default FeatureListItem;
