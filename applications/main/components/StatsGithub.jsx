import React from 'react';
import ReactTooltip from 'react-tooltip';

import GithubCalendar from './GithubCalendar.jsx';
import Trigger from '../../common/components/Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { statsGithub } from '../animations/stats.js';


const StatsGithub = ({
  gitContrib,
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
      <GithubCalendar {...gitContrib} />
    </WebAnimation>
    <ReactTooltip
      id="STATS__tooltip"
      effect="solid" place="top"
      insecure={false}
    />
  </div>
);

StatsGithub.propTypes = {
  gitContrib: React.PropTypes.shape({
    startDate: React.PropTypes.string,
    countArray: React.PropTypes.arrayOf(React.PropTypes.number),
    indexArray: React.PropTypes.arrayOf(React.PropTypes.number),
    maxCount: React.PropTypes.number,
    monthText: React.PropTypes.object,
  }),
  shouldAnimate: React.PropTypes.bool,
  onToggleAnimation: React.PropTypes.func,
};
StatsGithub.defaultProps = {
  gitContrib: {
    startDate: '',
    countArray: [],
    indexArray: [],
    maxCount: 0,
    monthText: {},
  },
  shouldAnimate: false,
  onToggleAnimation: () => {},
};


export default StatsGithub;
