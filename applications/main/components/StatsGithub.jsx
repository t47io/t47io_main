import React from 'react';
import ReactTooltip from 'react-tooltip';

import Trigger from '../../common/components/Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { statsGithub } from '../animations/stats.js';


const StatsGithub = ({
  gitSvg,
  shouldAnimate,
  onToggleAnimation,
}) => (
  <div>
    <Trigger onToggleAnimation={onToggleAnimation} />
    <WebAnimation
      className="text-center STATS__github"
      keyframes={statsGithub.keyframes}
      timing={statsGithub.timing}
      shouldAnimate={shouldAnimate}
      onFinish={ReactTooltip.rebuild}
    >
      <div dangerouslySetInnerHTML={{ __html: gitSvg }} />
    </WebAnimation>
    <ReactTooltip
      effect="solid" place="top"
      id="STATS__tooltip"
    />
  </div>
);

StatsGithub.propTypes = {
  gitSvg: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  onToggleAnimation: React.PropTypes.func,
};
StatsGithub.defaultProps = {
  gitSvg: '',
  shouldAnimate: false,
  onToggleAnimation: () => {},
};


export default StatsGithub;
