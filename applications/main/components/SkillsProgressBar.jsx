import React from 'react';
import PropTypes from 'prop-types';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { skillsItem } from '../animations/skills.js';
import {
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from '../constants/sectionTypes.js';


const SkillsProgressBar = ({
  title,
  value,
  side,
  shouldAnimate,
  index,
}) => (
  <WebAnimation
    className={`SKILLS__progress ${side}`}
    keyframes={skillsItem.keyframes(side)}
    timing={skillsItem.timing(index)}
    shouldAnimate={shouldAnimate}
  >
    <div
      className="SKILLS__bar" role="progressbar"
      aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"
      style={{ width: `${value}%` }}
    >
      {title}
    </div>
  </WebAnimation>
);

SkillsProgressBar.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  side: PropTypes.oneOf([SKILLS_LEFT, SKILLS_RIGHT]),
  shouldAnimate: PropTypes.bool,
  index: PropTypes.number,
};
SkillsProgressBar.defaultProps = {
  title: '',
  value: 0,
  side: SKILLS_LEFT,
  shouldAnimate: false,
  index: 0,
};


export default SkillsProgressBar;
