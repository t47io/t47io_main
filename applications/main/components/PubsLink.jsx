import React from 'react';


const PubsFileLink = ({
  url,
  isPreprint,
  icon,
  size,
  ...props
}) => {
  const href = (url && !isPreprint) ? { href: url } : {};
  const iconClassName = url ? 'text-main-dark bg-main-light' : 'text-gray-light';

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
  url: React.PropTypes.string,
  isPreprint: React.PropTypes.bool,
  icon: React.PropTypes.string,
  size: React.PropTypes.string,
};
PubsFileLink.defaultProps = {
  url: '',
  isPreprint: false,
  icon: '',
  size: '',
};


export default PubsFileLink;
