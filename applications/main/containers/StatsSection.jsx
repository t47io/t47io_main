import React from 'react';

import Trigger from '../../common/components/Trigger.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Carousel from '../../common/components/Carousel.jsx';
import StatsItem from '../components/StatsItem.jsx';
import StatsGithub from '../components/StatsGithub.jsx';

import '../stylesheets/StatsSection.scss';


const StatsSection = ({
  data: {
    items,
    backgrounds,
    links,
    gitSvg,
  },
  animations: {
    header,
    counter,
    github,
  },
  actions: {
    animateHeader,
    animateCounters,
    animateGithub,
  },
}) => (
  <section id="STATS__section">
    <Carousel
      className="STATS__area text-white"
      items={backgrounds}
      interval={4000}
    >
      <div className="UTIL__spacer-lg STATS__trigger" />
      <SectionHeader
        title="my stats"
        subtitle="what I achieved"
        shouldAnimate={header}
        onToggleAnimation={animateHeader}
      />
      <div className="UTIL__spacer-lg" />

      <div className="container">
        <Trigger onToggleAnimation={animateCounters} />
        <div className="row">
          {items.map((item, i) => (
            <StatsItem
              key={`STATS__counter-${i}`}
              shouldAnimate={i < counter}
              {...item}
            />
          ))}
        </div>
      </div>
      <div className="UTIL__spacer-lg" />
    </Carousel>

    <div className="UTIL__spacer-xl" />
    <h3 className="text-center">
      <i className="fa fa-fw fa-github-circled" />
      Contributions
      <small style={{ marginLeft: '0.5em' }}>
        (
        <a
          href={links.github}
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
        and
        <a
          href={links.githubMinted}
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
        )
      </small>
    </h3>

    <div className="UTIL__spacer-md" />
    <StatsGithub
      gitSvg={gitSvg}
      shouldAnimate={github}
      onToggleAnimation={animateGithub}
    />
  </section>
);

StatsSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    backgrounds: React.PropTypes.arrayOf(React.PropTypes.string),
    links: React.PropTypes.shape({
      github: React.PropTypes.string,
      githubMinted: React.PropTypes.string,
    }),
    gitSvg: React.PropTypes.string,
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    counter: React.PropTypes.number,
    github: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateCounters: React.PropTypes.func,
    animateGithub: React.PropTypes.func,
  }),
};
StatsSection.defaultProps = {
  data: {
    items: [],
    backgrounds: [],
    links: {
      github: '',
      githubMinted: '',
    },
    gitSvg: '',
  },
  animations: {
    header: true,
    counter: NaN,
    github: true,
  },
  actions: {
    animateHeader: () => {},
    animateCounters: () => {},
    animateGithub: () => {},
  },
};


export default StatsSection;
