import React from 'react';
import { SparkScroll } from '../../common/js/factory.js';

import { stats as tween } from '../js/tweens.js';


class StatsItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  render() {
    const { id, icon, title, value } = this.props;
    const done = (this.state.value === value) ? 'done' : '';

    return (
      <div className="STATS__item text-center col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <SparkScroll.div
          className="STATS__counter"
          proxy="STATS__proxy"
          callback={ratio => this.setState({ value: Math.ceil(ratio * value) })}
          timeline={tween.counter(id * 10)}
        >
          <i className={`fa fa-${icon} fa-3x fa-fw`} />
          <div className="UTIL__spacer-md" />
          <span id={`STATS__counter_${id}`} className="STATS__num">
            {this.state.value}
          </span>
          <div className="UTIL__spacer-md" />
          <p className={`lead STATS__text ${done}`}>
            <b>{title}</b>
          </p>
        </SparkScroll.div>
      </div>
    );
  }
}

StatsItem.propTypes = {
  id: React.PropTypes.number,
  icon: React.PropTypes.string,
  title: React.PropTypes.string,
  value: React.PropTypes.number,
};


export default StatsItem;
