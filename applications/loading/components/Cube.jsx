import React from 'react';

import Logo from '../../common/components/Logo.jsx';
import { EMAIL } from '../../common/constants/util.js';

// import '../stylesheets/Cube.scss';


const Cube = () => (
  <div className="LOAD__container UTIL__image-RNA">
    <div className="LOAD__content">
      <Logo
        href={`mailto:${EMAIL}`}
        className="LOAD__logo green"
      />

      <div className="row">
        <div className="LOAD__cube center-block">
          <div className="LOAD__cube-group LOAD__cube-group--1">
            <div className="LOAD__cube-face LOAD__cube-face--front">
              {Array(...Array(3)).map(() => (
                <i className="LOAD__cube-tile" />
              ))}
            </div>
            <div className="LOAD__cube-face LOAD__cube-face--left">
              {Array(...Array(3)).map(() => (
                <i className="LOAD__cube-tile" />
              ))}
            </div>
          </div>
          <div className="LOAD__cube-group LOAD__cube-group--2">
            <div className="LOAD__cube-face LOAD__cube-face--front">
              {Array(...Array(3)).map(() => (
                <i className="LOAD__cube-tile" />
              ))}
            </div>
            <div className="LOAD__cube-face LOAD__cube-face--bottom">
              {Array(...Array(3)).map(() => (
                <i className="LOAD__cube-tile" />
              ))}
            </div>
          </div>
          <div className="LOAD__cube-group LOAD__cube-group--3">
            <div className="LOAD__cube-face LOAD__cube-face--front">
              {Array(...Array(3)).map(() => (
                <i className="LOAD__cube-tile" />
              ))}
            </div>
            <div className="LOAD__cube-face LOAD__cube-face--right">
              {Array(...Array(3)).map(() => (
                <i className="LOAD__cube-tile" />
              ))}
            </div>
          </div>
          <div className="LOAD__cube-group LOAD__cube-group--4">
            <div className="LOAD__cube-face LOAD__cube-face--front">
              {Array(...Array(3)).map(() => (
                <i className="LOAD__cube-tile" />
              ))}
            </div>
            <div className="LOAD__cube-face LOAD__cube-face--top">
              {Array(...Array(3)).map(() => (
                <i className="LOAD__cube-tile" />
              ))}
            </div>
          </div>
          <div className="LOAD__cube-shadow" />
        </div>
      </div>
    </div>
  </div>
);


export default Cube;
