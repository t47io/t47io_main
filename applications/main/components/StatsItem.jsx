import React from 'react';
import PropTypes from 'prop-types';

import Counter from '../../common/components/Counter.jsx';
import WebAnimation from '../../common/components/WebAnimation.jsx';

import { statsItem } from '../animations/stats.js';

import cssUtil from '../stylesheets/util.scss';
import cssStats from '../stylesheets/StatsSection.scss';


const StatsItem = ({
  icon,
  title,
  value,
  shouldAnimate,
  index,
}) => (
  <div styleName="cssStats.STATS__item" className="text-center col-xs-6 col-sm-6 col-md-3 col-lg-3">
    <WebAnimation
      styleName="cssStats.STATS__counter"
      keyframes={statsItem.keyframes}
      timing={statsItem.timing(index)}
      shouldAnimate={shouldAnimate}
    >
      <i className={`fa fa-${icon} fa-3x fa-fw`} />
      <div styleName="cssUtil.UTIL__spacer-md" />
      <Counter
        className={cssStats.STATS__num}
        doneClassName={cssStats.done}
        endValue={value}
        shouldAnimate={shouldAnimate}
      />
      <div styleName="cssUtil.UTIL__spacer-md" />
      <p styleName="cssStats.STATS__text" className="lead">
        <b>{title}</b>
      </p>
    </WebAnimation>
  </div>
);

StatsItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.number,
  shouldAnimate: PropTypes.bool,
  index: PropTypes.number,
};
StatsItem.defaultProps = {
  icon: '',
  title: '',
  value: NaN,
  shouldAnimate: false,
  index: 0,
};


export default StatsItem;
