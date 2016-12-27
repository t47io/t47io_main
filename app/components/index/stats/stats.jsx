import React from 'react';

const pubs = require('../pubs/pubs.json');
const data = require('./stats.json');
require('./stats.scss');

let countPubs = 0;
for (let i in pubs.items) {
  countPubs += pubs.items[i].items.length;
}
data.items[2].value = countPubs;

const StatsItem = ({id, icon, title, value}) => (
  <div className="STATS__item text-center col-xs-6 col-sm-6 col-md-3 col-lg-3">
    <div className="STATS__counter">
      <i className={`fa fa-${icon} fa-3x fa-fw`}></i>
      <div className="extra-space-m"></div>
      <span id={`STATS__counter_${id}`} className="STATS__num">{value}</span>
      <div className="extra-space-m"></div>
      <p className="lead STATS__text"><b>{title}</b></p>
    </div>
  </div>
);

const StatsSection = () => (
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
      <div className="container">
        <div className="page-header text-center STATS__header">
          <h2>My Stats</h2>
          <div className="divider"></div>
          <p className="subtitle">what I achieved</p>
        </div>
      </div>
      <div className="extra-space-l"></div>

      <div className="container">
        <div className="row">
          {data.items.map((item) => (<StatsItem {...item} />))}
        </div>
      </div>
      <div className="extra-space-l"></div>
    </div>

    <div className="extra-space-xl"></div>
    <h3 className="text-center">
      <i className="fa fa-fw fa-github"></i> Contributions
      <a href="{{links.github}}" target="_blank" rel="noopener noreferrer external"><i className="fa fa-fw fa-sm fa-external-link"></i></a>
    </h3>
    <div className="text-center STATS__github"></div>
  </section>
);


export default StatsSection;
