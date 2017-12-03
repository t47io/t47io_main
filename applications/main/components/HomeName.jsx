import React from 'react';
import PropTypes from 'prop-types';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { SvgName } from '../components/Images.js';
import { homeName } from '../animations/home.js';


const HomeName = ({
  intro,
  server,
}) => (
  server ? (
    <img
      className="HOME__name"
      src={SvgName}
      alt="Siqi Tian"
    />
  ) : (
    <WebAnimation
      className="HOME__title"
      keyframes={homeName.keyframes}
      timing={homeName.timing}
      shouldAnimate={intro}
    >
      <img
        className="HOME__name"
        src={SvgName}
        alt="Siqi Tian"
      />
    </WebAnimation>
  )
);

HomeName.propTypes = {
  intro: PropTypes.bool,
  server: PropTypes.bool,
};
HomeName.defaultProps = {
  intro: false,
  server: false,
};


export default HomeName;
