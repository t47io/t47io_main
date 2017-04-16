import React from 'react';

import Trigger from './Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

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
      <div className="UTIL__divider" />
      <p className="UTIL__section-subtitle">
        {subtitle}
      </p>
    </WebAnimation>
  </div>
);

SectionHeader.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  onToggleAnimation: React.PropTypes.func,
};
SectionHeader.defaultProps = {
  title: '',
  subtitle: '',
  shouldAnimate: false,
  onToggleAnimation: () => {},
};


export default SectionHeader;
