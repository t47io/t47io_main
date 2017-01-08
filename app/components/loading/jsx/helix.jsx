import React from 'react';

import {LogoAlt} from '../../common/jsx/logo.jsx';

require('../scss/helix.scss');


const HelixLoading = () => (
  <div class="LOAD__container UTIL__image-RNA">
    <div class="LOAD__content">
      <LogoAlt href="mailto:contact@t47.io" target="_blank" rel="noopener noreferrer external" className="LOAD__logo green-white" />
  
      <div class="row">
        <div class="LOAD__helix center-block" style="width:75%;">
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
