import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import GithubCalendar from './GithubCalendar.jsx';
import Trigger from '../../common/components/Trigger.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { statsGithub } from '../animations/stats.js';
import { noOp } from '../../common/util.js';

import '../stylesheets/StatsSection.scss';


const StatsGithub = ({
  gitContrib,
  shouldAnimate,
  onToggleAnimation,
}) => (
  <div>
    <Trigger onToggleAnimation={onToggleAnimation} />
    <WebAnimation
      styleName="STATS__github"
      className="text-center"
      keyframes={statsGithub.keyframes}
      timing={statsGithub.timing}
      shouldAnimate={shouldAnimate}
      onFinish={ReactTooltip.rebuild}
    >
      <GithubCalendar {...gitContrib} />
    </WebAnimation>
    <ReactTooltip
      id="STATS__tooltip"
      effect="solid"
      place="top"
      insecure={false}
    />
  </div>
);

StatsGithub.propTypes = {
  gitContrib: PropTypes.shape({
    startDate: PropTypes.string,
    countArray: PropTypes.arrayOf(PropTypes.number),
    indexArray: PropTypes.arrayOf(PropTypes.number),
    maxCount: PropTypes.number,
    monthText: PropTypes.object,
  }),
  shouldAnimate: PropTypes.bool,
  onToggleAnimation: PropTypes.func,
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
  onToggleAnimation: noOp,
};


export default StatsGithub;
