import React from 'react';

import SkillsProgressBar from './SkillsProgressBar.jsx';


const SkillsPanel = ({
  title,
  icon,
  tag,
  items,
  index,
}) => (
  <div className="SKILLS__chapter">
    <div className="SKILLS__title">
      <h6>
        <i className={`fa fa-fw fa-lg fa-${icon}`} />
        {title}
      </h6>
    </div>
    {items.map((item, i) => (
      <SkillsProgressBar {...item} tag={tag} index={`${index}-${i}`} />
    ))}
  </div>
);

SkillsPanel.propTypes = {
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  tag: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired,
};


export default SkillsPanel;
