import React from 'react';
import PropTypes from 'prop-types';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { imgName } from '../components/Images.js';
import { homeName } from '../animations/home.js';


const HomeName = ({
  shouldAnimate,
  isServer,
}) => (
  isServer ? (
    <img
      className="HOME__name"
      src={imgName}
      alt="Siqi Tian"
    />
  ) : (
    <WebAnimation
      className="HOME__title"
      keyframes={homeName.keyframes}
      timing={homeName.timing}
      shouldAnimate={shouldAnimate}
    >
      <img
        className="HOME__name"
        src={imgName}
        alt="Siqi Tian"
      />
    </WebAnimation>
  )
);

HomeName.propTypes = {
  shouldAnimate: PropTypes.bool,
  isServer: PropTypes.bool,
};
HomeName.defaultProps = {
  shouldAnimate: false,
  isServer: false,
};


export default HomeName;
