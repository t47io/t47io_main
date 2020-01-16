import React from 'react';
import PropTypes from 'prop-types';

import Trigger from './Trigger.jsx';
import WebAnimation from './WebAnimation.jsx';

import { imgDivider } from './Images.js';
import { sectionHeader } from '../animations/sectionHeader.js';
import { noOp } from '../util.js';

import cssUtil from '../../main/stylesheets/util.scss';
import cssSection from '../stylesheets/SectionHeader.scss';


const SectionHeader = ({
  title,
  subtitle,
  shouldAnimate,
  onToggleAnimation,
}) => (
  <div styleName="cssSection.UTIL__section-header cssUtil.UTIL__section-header">
    <Trigger onToggleAnimation={onToggleAnimation} />
    <WebAnimation
      styleName="cssSection.UTIL__section-div"
      keyframes={sectionHeader.keyframes}
      timing={sectionHeader.timing}
      shouldAnimate={shouldAnimate}
    >
      <h2 className="cssSection.UTIL__section-title">{title}</h2>
      <img
        styleName="cssUtil.UTIL__divider"
        src={imgDivider}
        alt="divider"
      />
      <p styleName="cssSection.UTIL__section-subtitle">
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
  onToggleAnimation: noOp,
};


export default SectionHeader;
