import React from 'react';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import {affiliation as tween} from '../js/tweens.js';


const AffiliationRewardItem = ({year, title}) => (
  <tr>
    <td><i className="text-gray">{year}</i></td>
    <td dangerouslySetInnerHTML={{__html: title}} ></td>
  </tr>
);

const AffiliationItem = ({year, title, url, geo, role, rewards, tag}) => (
  <div className="AFFILIATION__entry" id={`story_${year}`}>
    <div className="AFFILIATION__content active">
      <span className="AFFILIATION__year">{year}</span>
      <div className="AFFILIATION__panel row">
        <div className="AFFILIATION__title col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <a href={url} target="_blank" rel="noopener noreferrer external">
            <div className="sprite" style="width:100%;max-width:224px;"><div className={`aff_${tag}`}></div></div>
          </a>
          <br/>
          <a href={url} target="_blank" rel="noopener noreferrer external">{title} <i className="fa fa-fw fa-sm fa-external-link"></i></a>
          <br/>
          <span>{geo}</span>
        </div>
        <div className="AFFILIATION__text col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <p>
            <b>{role.position}</b> {role.title} <span className="text-green">@</span> <u>{role.team}</u>
          </p>
          <br/>
          <table className="hidden-xs hidden-sm">
            <tbody>
              {rewards.map((item) => (<AffiliationRewardItem {...item} />))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const AffiliationSection = ({items}) => (
  <section id="AFFILIATION__section" className="text-center">
    <div className="extra-space-l AFFILIATION__trigger"></div>
    <div className="stanford text-white parallax bg_rotate_fade">
      <div id="stanford-carousel" className="carousel carousel-fade slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#stanford-carousel" data-slide-to="0" className="active"></li>
          <li data-target="#stanford-carousel" data-slide-to="1"></li>
          <li data-target="#stanford-carousel" data-slide-to="2"></li>
          <li data-target="#stanford-carousel" data-slide-to="3"></li>
          <li data-target="#stanford-carousel" data-slide-to="4"></li>
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

      <SparkProxy.div className="container" proxyId="AFFILIATION__header">
        <SparkScroll.div className="page-header text-center AFFILIATION__header"
          proxy="AFFILIATION__header"
          timeline={tween.header} >
          <h2>who i am</h2>
          <div className="divider"></div>
          <p className="subtitle">where I have been</p>
        </SparkScroll.div>
      </SparkProxy.div>

      <div className="extra-space-l"></div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="AFFILIATION__story">
            <div className="AFFILIATION__timeline"></div>
            {items.map((item) => (<AffiliationItem {...item} />))}
            <div style="clear: both;"></div>
          </div>  
        </div>
      </div>
      <div className="extra-space-l"></div>
    </div>
  </section>
);


export default AffiliationSection;
