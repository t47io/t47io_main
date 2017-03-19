import React from 'react';

import SkillsProgressBar from './SkillsProgressBar.jsx';

import {
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from '../constants/sectionTypes.js';


const SkillsPanel = ({
  title,
  icon,
  items,
  side,
  counter,
  offset,
}) => (
  <div className="SKILLS__chapter">
    <div className="SKILLS__title">
      <h6>
        <i className={`fa fa-fw fa-lg fa-${icon}`} />
        {title}
      </h6>
    </div>
    {items.map((item, i) => (
      <SkillsProgressBar
        key={`SKILLS__progress-${side}-${i}`}
        side={side}
        shouldAnimate={i + offset < counter}
        {...item}
      />
    ))}
  </div>
);

SkillsPanel.propTypes = {
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.object),
  side: React.PropTypes.oneOf([SKILLS_LEFT, SKILLS_RIGHT]),
  counter: React.PropTypes.number,
  offset: React.PropTypes.number,
};
SkillsPanel.defaultProps = {
  title: '',
  icon: '',
  items: [],
  side: SKILLS_LEFT,
  counter: NaN,
  offset: 0,
};


export default SkillsPanel;
