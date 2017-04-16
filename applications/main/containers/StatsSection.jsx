import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Carousel from '../../common/components/Carousel.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import StatsItem from '../components/StatsItem.jsx';
import StatsGithub from '../components/StatsGithub.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import * as statsActions from '../actions/statsActions.js';

import '../stylesheets/StatsSection.scss';


const StatsSection = ({
  data: {
    items,
    backgrounds,
    links,
    gitContrib,
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
              shouldAnimate={counter}
              index={i}
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
      <small className="STATS__note-link">
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
      gitContrib={gitContrib}
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
    gitContrib: React.PropTypes.shape({
      startDate: React.PropTypes.string,
      countArray: React.PropTypes.arrayOf(React.PropTypes.number),
      indexArray: React.PropTypes.arrayOf(React.PropTypes.number),
      maxCount: React.PropTypes.number,
      monthText: React.PropTypes.object,
    }),
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    counter: React.PropTypes.bool,
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
    gitContrib: {
      startDate: '',
      countArray: [],
      indexArray: [],
      maxCount: 0,
      monthText: {},
    },
  },
  animations: {
    header: false,
    counter: false,
    github: false,
  },
  actions: {
    animateHeader: () => {},
    animateCounters: () => {},
    animateGithub: () => {},
  },
};


const mapStateToProps = state => (state.stats);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(statsActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsSection);
