import React from 'react';
import PropTypes from 'prop-types';

import Trigger from './Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { imgDivider } from './Images.js';
import { sectionHeader } from '../animations/sectionHeader.js';

import '../stylesheets/SectionHeader.scss';


const SectionHeader = ({
  title,
  subtitle,
  shouldAnimate,
  onToggleAnimation,
}) => (
  <div className="UTIL__section-header">
    <Trigger onToggleAnimation={onToggleAnimation} />
    <WebAnimation
      keyframes={sectionHeader.keyframes}
      timing={sectionHeader.timing}
      shouldAnimate={shouldAnimate}
    >
      <h2 className="UTIL__section-title">{title}</h2>
      <img
        className="UTIL__divider"
        src={imgDivider}
        alt="divider"
      />
      <p className="UTIL__section-subtitle">
        {subtitle}
      </p>
    </WebAnimation>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  onToggleAnimation: PropTypes.func,
};
SectionHeader.defaultProps = {
  title: '',
  subtitle: '',
  shouldAnimate: false,
  onToggleAnimation: () => {},
};


export default SectionHeader;
