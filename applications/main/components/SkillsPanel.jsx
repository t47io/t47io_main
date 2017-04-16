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
    <h6 className="SKILLS__title">
      <i className={`fa fa-fw fa-lg fa-${icon}`} />
      {title}
    </h6>

    {items.map((item, i) => (
      <SkillsProgressBar
        key={`SKILLS__progress-${side}-${i}`}
        side={side}
        shouldAnimate={counter}
        index={offset + i}
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
  counter: React.PropTypes.bool,
  offset: React.PropTypes.number,
};
SkillsPanel.defaultProps = {
  title: '',
  icon: '',
  items: [],
  side: SKILLS_LEFT,
  counter: false,
  offset: 0,
};


export default SkillsPanel;
