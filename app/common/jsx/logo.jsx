import React from 'react';


const logoSVG = require('../img/t47_logo.svg');
const logoAltSVG = require('../img/t47_logo_alt.svg');

const Logo = props => (
  <a {...props} dangerouslySetInnerHTML={{ __html: logoSVG }} />
);

const LogoAlt = props => (
  <a {...props} dangerouslySetInnerHTML={{ __html: logoAltSVG }} />
);


export {
  Logo,
  LogoAlt,
};
