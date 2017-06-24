import React from 'react';

import Logo from '../../common/components/Logo.jsx';
import { EMAIL } from '../../common/constants/util.js';

// import '../stylesheets/Cube.scss';


const Hexagon = () => (
  <div className="LOAD__container UTIL__image-RNA">
    <div className="LOAD__content">
      <Logo
        href={`mailto:${EMAIL}`}
        className="LOAD__logo green"
      />

      <div className="row">
        <div className="LOAD__hexagon">
          {Array(...Array(6)).map(() => (
            <div className="LOAD__hexagon-group">
              <div className="LOAD__hexagon-dot" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);


export default Hexagon;
