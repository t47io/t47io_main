import React from 'react';
import Waypoint from 'react-waypoint';
import SectionHeader from '../../common/jsx/header.jsx';
import Carousel from '../../common/jsx/carousel.jsx';
import {SparkScroll, SparkProxy} from '../../common/js/factory.js';

import {affiliation as tween} from '../js/tweens.js';


const AffiliationRewardItem = ({year, title}) => (
  <tr>
    <td><i className="text-gray">{year}</i>&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td dangerouslySetInnerHTML={{__html: title}} ></td>
  </tr>
);

const AffiliationItem = ({year, title, url, geo, role, rewards, tag, scroll, onPositionChange}) => (
  <div className="AFFILIATION__entry" id={`story_${year}`}
    style={`z-index: ${(year === scroll) ? 15 : 10}`} >
    <div className={`AFFILIATION__content ${(year === scroll) ? "active" : ""}`} >
      <span className="AFFILIATION__year">{year}</span>
      <div className="AFFILIATION__panel row">
        <div className="AFFILIATION__title col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <a href={url} target="_blank" rel="noopener noreferrer external">
            <div className="SPRITE">
              <div className={`SPRITE__affiliation-${tag}`}></div>
            </div>
          </a>
          <br/>
          <a href={url} target="_blank" rel="noopener noreferrer external">{title} <i className="fa fa-fw fa-sm fa-link-ext"></i></a>
          <br/>
          <span>{geo}</span>
        </div>
        <div className="AFFILIATION__text col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <p>
            <b>{role.position}</b> {role.title}&nbsp;
            <br className="hidden-lg hidden-md" />
            <span className="text-green">@</span>
            &nbsp;<u>{role.team}</u>
          </p>
          <br className="hidden-xs hidden-sm" />
          <table className="hidden-xs hidden-sm">
            <tbody>
              {rewards.map((item) => (<AffiliationRewardItem {...item} />))}
            </tbody>
          </table>
        </div>
      </div>
      <Waypoint onPositionChange={onPositionChange(year)} />
    </div>
  </div>
);

class AffiliationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {scroll: this.props.items[0].year};
  }

  onScrollItem(year) {
    return ({currentPosition, previousPosition}) => {
      if (currentPosition === 'inside' || previousPosition === 'inside') { this.setState({scroll: year}); }
    };
  }

  render() {
    const {items, background} = this.props, {scroll} = this.state;
    return (
      <section id="AFFILIATION__section" className="text-center">
        <Carousel extraClassName="text-white"
          items={background} interval={4000} >
          <div className="UTIL__spacer-lg AFFILIATION__trigger"></div>
          <SectionHeader title="who i am" subtitle="where I have been" proxyId="AFFILIATION__header" tween={tween.header} />

          <div className="UTIL__spacer-lg"></div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="AFFILIATION__story">
                <div className="AFFILIATION__timeline"></div>
                {items.map((item) => (<AffiliationItem {...item} scroll={scroll} onPositionChange={this.onScrollItem.bind(this)} />))}
              </div>  
            </div>
          </div>
          <div className="UTIL__spacer-lg"></div>
        </Carousel>
      </section>
    );
  }
}


export default AffiliationSection;
