import React from 'react';
import PropTypes from 'prop-types';

import { TARGET_BLANK } from '../../common/constants/util.js';

import cssType from '../../common/mixins/typography.scss';
import cssPubs from '../stylesheets/PubsSection.scss';


const PubsLink = ({
  url,
  isPreprint,
  icon,
  size,
  ...props
}) => {
  const isAvailable = size ? (size !== 'unavailable') : (url && !isPreprint);
  const href = isAvailable ? { href: url } : {};
  let iconClassName = isAvailable ?
    `${cssType['text-main-dark']} ${cssType['bg-main-light']}` : cssType['text-gray-light'];
  if (size) { iconClassName += ' lead'; }

  const iconElement = (
    <a
      className={iconClassName}
      {...href}
      {...TARGET_BLANK}
    >
      <i className={`fa fa-fwn fa-${icon}`} />
    </a>
  );

  if (size) {
    return (
      <span {...props}>
        {iconElement}
        <span styleName="cssPubs.PUBS__link-text cssType.text-gray">{size}</span>
      </span>
    );
  }
  return iconElement;
};

PubsLink.propTypes = {
  url: PropTypes.string,
  isPreprint: PropTypes.bool,
  icon: PropTypes.string,
  size: PropTypes.string,
};
PubsLink.defaultProps = {
  url: '',
  isPreprint: false,
  icon: '',
  size: '',
};


export default PubsLink;
