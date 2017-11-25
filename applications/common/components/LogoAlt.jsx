import React from 'react';
import PropTypes from 'prop-types';

import { SvgLogoAlt } from './Images.js';

// import '../stylesheets/Logo.scss';


const targetBlank = {
  target: '_blank',
  rel: 'noopener noreferrer external',
};

const LogoAlt = ({
  href,
  isTargetBlank,
  className,
}) => {
  const target = isTargetBlank ? targetBlank : {};

  return (
    <a
      {...target}
      href={href}
      className={className}
    >
      <SvgLogoAlt />
    </a>
  );
};

LogoAlt.propTypes = {
  href: PropTypes.string,
  isTargetBlank: PropTypes.bool,
  className: PropTypes.string,
};
LogoAlt.defaultProps = {
  href: '/',
  isTargetBlank: true,
  className: '',
};


export default LogoAlt;
