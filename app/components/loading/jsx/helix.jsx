import React from 'react';

import {LogoAlt} from '../../common/jsx/logo.jsx';

require('../scss/helix.scss');


const HelixLoading = () => (
  <div className="LOAD__container UTIL__image-RNA">
    <div className="LOAD__content">
      <LogoAlt href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external" className="LOAD__logo green-white" />
  
      <div className="row">
        <div className="LOAD__helix center-block" style="width:75%;">
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div><div></div>
          <div></div><div></div>
        </div>
      </div>
    </div>
  </div>
);


export default HelixLoading;
