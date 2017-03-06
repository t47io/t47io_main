import React from 'react';
import {
  SparkScroll,
  SparkProxy,
} from '../../common/js/factory.js';

import { skills as tween } from '../js/tweens.js';


const SkillsProgressBar = ({
  title,
  value,
  tag,
  index,
}) => (
  <SparkProxy.div proxyId={`SKILLS__proxy${tag}_${index}`}>
    <SparkScroll.div className={`SKILLS__progress ${tag}`}
      proxy={`SKILLS__proxy${tag}_${index}`}
      timeline={tween[`progress${tag}`]}
    >
      <div className="SKILLS__bar" role="progressbar"
        aria-valuenow={value} aria-valuemin="0" aria-valuemax="100"
        style={{ width: `${value}%` }}
      >
        {title}
      </div>
    </SparkScroll.div>
  </SparkProxy.div>
);

SkillsProgressBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  tag: React.PropTypes.string.isRequired,
  index: React.PropTypes.string.isRequired,
};


export default SkillsProgressBar;
