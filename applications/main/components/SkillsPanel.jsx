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
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
  tag: React.PropTypes.string,
  items: React.PropTypes.array,
  index: React.PropTypes.number,
};


export default SkillsPanel;
