import React from 'react';
import Waypoint from 'react-waypoint';

import AffiliationPanel from './AffiliationPanel.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { affiliationPanel } from '../animations/affiliation.js';


const AffiliationItem = ({
  year,
  title,
  url,
  geo,
  role,
  rewards,
  tag,
  shouldAnimate,
  onToggleAnimation,
  index,
}) => {
  const contentClassName = shouldAnimate ? 'active' : '';

  return (
    <div className="AFFILIATION__entry">
      <div className={`AFFILIATION__content ${contentClassName}`}>
        <Waypoint
          topOffset="80px"
          bottomOffset="-20px"
          onEnter={({ previousPosition, currentPosition }) => {
            // console.log(year, 'enter top: now=', currentPosition, ', before=', previousPosition);
            if (currentPosition === Waypoint.inside && previousPosition === Waypoint.above) {
              onToggleAnimation(index);
            }
          }}
          onLeave={({ previousPosition, currentPosition }) => {
            // console.log(year, 'leave top: now=', currentPosition, ', before=', previousPosition);
            if (currentPosition === Waypoint.above && previousPosition === Waypoint.inside) {
              onToggleAnimation(index + 1);
            }
          }}
          fireOnRapidScroll={false}
        />

        <span className="AFFILIATION__year">
          <span className="AFFILIATION__year-text">{year}</span>
        </span>
        <WebAnimation
          keyframes={affiliationPanel.keyframes(shouldAnimate)}
          timing={affiliationPanel.timing}
          shouldAnimate
          shouldReverse={shouldAnimate}
        >
          <AffiliationPanel
            year={year}
            title={title}
            url={url}
            geo={geo}
            role={role}
            rewards={rewards}
            tag={tag}
          />
        </WebAnimation>

        <Waypoint
          topOffset="20px"
          bottomOffset="20px"
          onEnter={({ previousPosition, currentPosition }) => {
            // console.log(year, 'enter bottom: now=', currentPosition, ', before=', previousPosition);
            if (currentPosition === Waypoint.inside && previousPosition === Waypoint.below) {
              onToggleAnimation(index);
            }
          }}
          onLeave={({ previousPosition, currentPosition }) => {
            // console.log(year, 'leave bottom: now=', currentPosition, ', before=', previousPosition);
            if (currentPosition === Waypoint.below && previousPosition === Waypoint.inside) {
              onToggleAnimation(index - 1);
            }
          }}
          fireOnRapidScroll={false}
        />
      </div>
    </div>
  );
};

AffiliationItem.propTypes = {
  year: React.PropTypes.number,
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  geo: React.PropTypes.string,
  role: React.PropTypes.object,
  rewards: React.PropTypes.arrayOf(React.PropTypes.object),
  tag: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  onToggleAnimation: React.PropTypes.func,
  index: React.PropTypes.number,
};
AffiliationItem.defaultProps = {
  year: NaN,
  title: '',
  url: '',
  geo: '',
  role: {},
  rewards: [],
  tag: '',
  shouldAnimate: false,
  onToggleAnimation: () => {},
  index: 0,
};


export default AffiliationItem;

