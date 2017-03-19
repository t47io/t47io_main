import React from 'react';
import ReactTooltip from 'react-tooltip';
import Waypoint from 'react-waypoint';

import Animation from '../../common/components/Animation.jsx';
import Trigger from '../../common/components/Trigger.jsx';


const StatsGithub = ({
  gitSvg,
  shouldAnimate,
  onToggleAnimation,
}) => (
  <div>
    <Trigger onToggleAnimation={onToggleAnimation} />
    <Animation
      className="text-center STATS__github"
      shouldAnimate={shouldAnimate}
      shouldForceUpdate
    >
      <Waypoint
        topOffset="150px"
        bottomOffset="150px"
        onEnter={({ previousPosition, currentPosition }) => {
          if (currentPosition === Waypoint.inside) {
            const delay = (previousPosition === Waypoint.below) ? 1250 : 250;
            setTimeout(() => ReactTooltip.rebuild(), delay);
          }
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: gitSvg }} />
      </Waypoint>
    </Animation>
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
  shouldAnimate: true,
  onToggleAnimation: () => {},
};


export default StatsGithub;
