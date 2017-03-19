import React from 'react';
import ReactTooltip from 'react-tooltip';
import {
  SparkScroll,
  SparkProxy,
} from '../../common/js/factory.js';

import SectionHeader from '../../common/components/SectionHeader.jsx';
import Carousel from '../../common/components/Carousel.jsx';
import StatsItem from '../components/StatsItem.jsx';

import { stats as tween } from '../js/tweens.js';
import '../stylesheets/StatsSection.scss';


class StatsSection extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onBindTooltip = this.onBindTooltip.bind(this);
  }

  onBindTooltip(ratio) {
    if (ratio === 1) { ReactTooltip.rebuild(); }
  }

  render() {
    const { items, backgrounds, links, gitSvg } = this.props;
    return (
      <section id="STATS__section">
        <Carousel
          extraClassName="STATS__area text-white"
          items={backgrounds} interval={4000}
        >
          <div className="UTIL__spacer-lg STATS__trigger" />
          <SectionHeader
            title="my stats" subtitle="what I achieved"
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
          <small style={{ marginLeft: '0.5em' }}>
            (
            <a href={links.github} target="_blank" rel="noopener noreferrer external">
              <i className="fa fa-fw fa-sm fa-link-ext" />
            </a>
            and
            <a href={links.githubMinted} target="_blank" rel="noopener noreferrer external">
              <i className="fa fa-fw fa-sm fa-link-ext" />
            </a>
            )
          </small>
        </h3>

        <div className="UTIL__spacer-md" />
        <SparkScroll.div
          className="text-center STATS__github"
          timeline={tween.git}
          callback={ratio => this.onBindTooltip(ratio)}
          dangerouslySetInnerHTML={{ __html: gitSvg }}
        />
        <ReactTooltip effect="solid" place="top" id="STATS__tooltip" />
      </section>
    );
  }
}

StatsSection.propTypes = {
  items: React.PropTypes.array,
  backgrounds: React.PropTypes.array,
  links: React.PropTypes.shape({
    github: React.PropTypes.string,
    githubMinted: React.PropTypes.string,
  }),
  gitSvg: React.PropTypes.string,
};


export default StatsSection;
