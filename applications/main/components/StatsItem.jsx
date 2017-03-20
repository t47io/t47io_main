import React from 'react';

import Counter from '../../common/components/Counter.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { statsItem } from '../animations/stats.js';


const StatsItem = ({
  icon,
  title,
  value,
  shouldAnimate,
  index,
}) => (
  <div className="STATS__item text-center col-xs-6 col-sm-6 col-md-3 col-lg-3">
    <WebAnimation
      className="STATS__counter"
      keyframes={statsItem.keyframes}
      timing={statsItem.timing(index)}
      shouldAnimate={shouldAnimate}
    >
      <i className={`fa fa-${icon} fa-3x fa-fw`} />
      <div className="UTIL__spacer-md" />
      <Counter
        className="STATS__num"
        endValue={value}
        shouldAnimate={shouldAnimate}
      />
      <div className="UTIL__spacer-md" />
      <p className="lead STATS__text">
        <b>{title}</b>
      </p>
    </WebAnimation>
  </div>
);

StatsItem.propTypes = {
  icon: React.PropTypes.string,
  title: React.PropTypes.string,
  value: React.PropTypes.number,
  shouldAnimate: React.PropTypes.bool,
  index: React.PropTypes.number,
};
StatsItem.defaultProps = {
  icon: '',
  title: '',
  value: NaN,
  shouldAnimate: false,
  index: 0,
};


export default StatsItem;
