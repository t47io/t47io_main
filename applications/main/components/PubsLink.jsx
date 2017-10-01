import React from 'react';
import PropTypes from 'prop-types';


const PubsFileLink = ({
  url,
  isPreprint,
  icon,
  size,
  ...props
}) => {
  const isAvailable = size ? (size !== 'unavailable') : (url && !isPreprint);
  const href = isAvailable ? { href: url } : {};
  let iconClassName = isAvailable ? 'text-main-dark bg-main-light' : 'text-gray-light';
  if (size) { iconClassName += ' lead'; }

  const iconElement = (
    <a
      {...href}
      target="_blank" rel="noopener noreferrer external"
      className={iconClassName}
    >
      <i className={`fa fa-fwn fa-${icon}`} />
    </a>
  );

  if (size) {
    return (
      <span {...props}>
        {iconElement}
        <span className="PUBS__link-text text-gray">{size}</span>
      </span>
    );
  }
  return iconElement;
};

PubsFileLink.propTypes = {
  url: PropTypes.string,
  isPreprint: PropTypes.bool,
  icon: PropTypes.string,
  size: PropTypes.string,
};
PubsFileLink.defaultProps = {
  url: '',
  isPreprint: false,
  icon: '',
  size: '',
};


export default PubsFileLink;
