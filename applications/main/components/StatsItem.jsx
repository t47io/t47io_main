import React from 'react';

import Animation from '../../common/components/Animation.jsx';
import Counter from '../../common/components/Counter.jsx';


const StatsItem = ({
  icon,
  title,
  value,
  shouldAnimate,
}) => (
  <div className="STATS__item text-center col-xs-6 col-sm-6 col-md-3 col-lg-3">
    <Animation
      className="STATS__counter"
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
    </Animation>
  </div>
);

StatsItem.propTypes = {
  icon: React.PropTypes.string,
  title: React.PropTypes.string,
  value: React.PropTypes.number,
  shouldAnimate: React.PropTypes.bool,
};
StatsItem.defaultProps = {
  icon: '',
  title: '',
  value: NaN,
  shouldAnimate: true,
};


export default StatsItem;
