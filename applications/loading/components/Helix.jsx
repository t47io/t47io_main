import React from 'react';

import LogoAlt from '../../common/components/LogoAlt.jsx';

// import '../stylesheets/Helix.scss';


const Helix = () => (
  <div className="LOAD__container UTIL__image-RNA">
    <div className="LOAD__content">
      <LogoAlt
        href="mailto:contact@t47.io"
        className="LOAD__logo green-white"
      />

      <div className="row">
        <div className="LOAD__helix center-block">
          {Array(...Array(26)).map(() => (
            <div className="LOAD__helix-dot" />
          ))}
        </div>
      </div>
    </div>
  </div>
);


export default Helix;
