import React from 'react';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import {stats as tween} from '../js/tweens.js';


class StatsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  render() {
    const {id, icon, title, value, index} = this.props;
    const done = (this.state.value == value) ? "done" : "";
    return (
      <div className="STATS__item text-center col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <SparkScroll.div className="STATS__counter"
          proxy="STATS__proxy"
          callback={(ratio) => {
            this.setState({value: Math.ceil(ratio*value)});
          }}
          timeline={tween.counter(index*10)} >
          <i className={`fa fa-${icon} fa-3x fa-fw`}></i>
          <div className="extra-space-m"></div>
          <span id={`STATS__counter_${id}`} className="STATS__num">{this.state.value}</span>
          <div className="extra-space-m"></div>
          <p className={`lead STATS__text ${done}`}><b>{title}</b></p>
        </SparkScroll.div>
      </div>
    );
  }
}

const StatsSection = ({items, git}) => (
  <section id="STATS__section">
    <div className="extra-space-xxl STATS__trigger"></div>

    <div className="STATS__area text-white parallax bg_rotate_fade">
      <div id="stat-carousel" className="carousel carousel-fade slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#stat-carousel" data-slide-to="0" className="active"></li>
          <li data-target="#stat-carousel" data-slide-to="1"></li>
          <li data-target="#stat-carousel" data-slide-to="2"></li>
          <li data-target="#stat-carousel" data-slide-to="3"></li>
          <li data-target="#stat-carousel" data-slide-to="4"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="item active" data-slide-to="0"></div>
          <div className="item" data-slide-to="1"></div>
          <div className="item" data-slide-to="2"></div>
          <div className="item" data-slide-to="3"></div>
          <div className="item" data-slide-to="4"></div>
        </div>
      </div>
      
      <div className="cover"></div>
      <SparkProxy.div className="container" proxyId="STATS__header">
        <SparkScroll.div className="page-header text-center STATS__header"
          proxy="STATS__header"
          timeline={tween.header} >
          <h2>My Stats</h2>
          <div className="divider"></div>
          <p className="subtitle">what I achieved</p>
        </SparkScroll.div>
      </SparkProxy.div>
      <div className="extra-space-l"></div>

      <div className="container">
        <SparkProxy.div className="row" proxyId="STATS__proxy">
          {items.map((item, i) => (<StatsItem {...item} index={i} />))}
        </SparkProxy.div>
      </div>
      <div className="extra-space-l"></div>
    </div>

    <div className="extra-space-xl"></div>
    <h3 className="text-center">
      <i className="fa fa-fw fa-github"></i> Contributions
      <a href="{{links.github}}" target="_blank" rel="noopener noreferrer external"><i className="fa fa-fw fa-sm fa-external-link"></i></a>
    </h3>
    <SparkScroll.div className="text-center STATS__github"
      timeline={tween.git} ></SparkScroll.div>
  </section>
);


export default StatsSection;
