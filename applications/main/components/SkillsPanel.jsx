import React from 'react';
import PropTypes from 'prop-types';

import SkillsProgressBar from './SkillsProgressBar.jsx';

import {
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from '../constants/sectionTypes.js';

import '../stylesheets/SkillsSection.scss';


const SkillsPanel = ({
  title,
  icon,
  items,
  side,
  counter,
  offset,
}) => (
  <div styleName="SKILLS__chapter">
    <h6 styleName="SKILLS__title">
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
  title: PropTypes.string,
  icon: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  side: PropTypes.oneOf([SKILLS_LEFT, SKILLS_RIGHT]),
  counter: PropTypes.bool,
  offset: PropTypes.number,
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
