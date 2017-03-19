import React from 'react';

import Animation from '../../common/components/Animation.jsx';

import {
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from '../constants/sectionTypes.js';


const SkillsProgressBar = ({
  title,
  value,
  side,
  shouldAnimate,
}) => (
  <Animation
    className={`SKILLS__progress ${side}`}
    shouldAnimate={shouldAnimate}
  >
    <div
      className="SKILLS__bar" role="progressbar"
      aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"
      style={{ width: `${value}%` }}
    >
      {title}
    </div>
  </Animation>
);

SkillsProgressBar.propTypes = {
  title: React.PropTypes.string,
  value: React.PropTypes.number,
  side: React.PropTypes.oneOf([SKILLS_LEFT, SKILLS_RIGHT]),
  shouldAnimate: React.PropTypes.bool,
};
SkillsProgressBar.defaultProps = {
  title: '',
  value: 0,
  side: SKILLS_LEFT,
  shouldAnimate: true,
};


export default SkillsProgressBar;
