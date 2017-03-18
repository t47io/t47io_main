import React from 'react';

import '../stylesheets/Logo.scss';

const logoAltSVG = require('../images/t47_logo_alt.svg');


const LogoAlt = props => (
  <a {...props} dangerouslySetInnerHTML={{ __html: logoAltSVG }} />
);


export default LogoAlt;
