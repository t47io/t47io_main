import React from 'react';
import ReactTooltip from 'react-tooltip';
import {
  SparkScroll,
  SparkProxy,
} from '../../common/js/factory.js';

import SectionHeader from '../../common/jsx/header.jsx';
import Carousel from '../../common/jsx/carousel.jsx';
import { stats as tween } from '../js/tweens.js';


class StatsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  render() {
    const { id, icon, title, value } = this.props;
    const done = (this.state.value === value) ? 'done' : '';

    return (
      <div className="STATS__item text-center col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <SparkScroll.div className="STATS__counter"
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
  id: React.PropTypes.number.isRequired,
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
};


const StatsSection = ({
  items,
  background,
  links,
  gitSvg,
}) => (
  <section id="STATS__section">
    <Carousel extraClassName="STATS__area text-white"
      items={background} interval={4000}
    >
      <div className="UTIL__spacer-lg STATS__trigger" />
      <SectionHeader title="my stats" subtitle="what I achieved"
        proxyId="STATS__header"
        tween={tween.header}
      />
      <div className="UTIL__spacer-lg" />

      <div className="container">
        <SparkProxy.div className="row" proxyId="STATS__proxy">
          {items.map(item => (<StatsItem {...item} />))}
        </SparkProxy.div>
      </div>
      <div className="UTIL__spacer-lg" />
    </Carousel>

    <div className="UTIL__spacer-xl" />
    <h3 className="text-center">
      <i className="fa fa-fw fa-github-circled" />
      Contributions
      <a href={links.github} target="_blank" rel="noopener noreferrer external">
        <i className="fa fa-fw fa-sm fa-link-ext" />
      </a>
    </h3>

    <div className="UTIL__spacer-md" />
    <SparkScroll.div className="text-center STATS__github"
      timeline={tween.git}
    >
      <div dangerouslySetInnerHTML={{ __html: gitSvg }} />
      <ReactTooltip effect="solid" place="top" id="STATS__tooltip" />
    </SparkScroll.div>
  </section>
);
StatsSection.propTypes = {
  items: React.PropTypes.array.isRequired,
  background: React.PropTypes.array.isRequired,
  links: React.PropTypes.shape({
    github: React.PropTypes.string.isRequired,
    githubMinted: React.PropTypes.string.isRequired,
  }),
  gitSvg: React.PropTypes.string.isRequired,
};


export default StatsSection;
