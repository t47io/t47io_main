import React from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';

import AffiliationPanel from './AffiliationPanel.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { affiliationPanel } from '../animations/affiliation.js';


const AffiliationItem = ({
  year,
  items,
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
            if (currentPosition === Waypoint.inside && previousPosition === Waypoint.above) {
              onToggleAnimation(index);
            }
          }}
          onLeave={({ previousPosition, currentPosition }) => {
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
          {items.map((item, i) => (
            <AffiliationPanel
              key={`AFFILIATION__panel-${year}-${i}`}
              {...item}
            />
          ))}
        </WebAnimation>

        <Waypoint
          topOffset="20px"
          bottomOffset="20px"
          onEnter={({ previousPosition, currentPosition }) => {
            if (currentPosition === Waypoint.inside && previousPosition === Waypoint.below) {
              onToggleAnimation(index);
            }
          }}
          onLeave={({ previousPosition, currentPosition }) => {
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
  year: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
  shouldAnimate: PropTypes.bool,
  onToggleAnimation: PropTypes.func,
  index: PropTypes.number,
};
AffiliationItem.defaultProps = {
  year: NaN,
  items: [],
  shouldAnimate: false,
  onToggleAnimation: () => {},
  index: 0,
};


export default AffiliationItem;

