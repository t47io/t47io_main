import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Carousel from '../components/Carousel.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import StatsItem from '../components/StatsItem.jsx';
import StatsGithub from '../components/StatsGithub.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import * as statsActions from '../actions/statsActions.js';
import { initialState as statsProps } from '../reducers/stats.js';
import { STATS } from '../constants/sectionTypes.js';
import { GITHUB_HOST } from '../../config.js';

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
          href={`${GITHUB_HOST}/${links.github}`}
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
        and
        <a
          href={`${GITHUB_HOST}/${links.githubMinted}`}
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
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    backgrounds: PropTypes.arrayOf(PropTypes.string),
    links: PropTypes.shape({
      github: PropTypes.string,
      githubMinted: PropTypes.string,
    }),
    gitContrib: PropTypes.shape({
      startDate: PropTypes.string,
      countArray: PropTypes.arrayOf(PropTypes.number),
      indexArray: PropTypes.arrayOf(PropTypes.number),
      maxCount: PropTypes.number,
      monthText: PropTypes.object,
    }),
  }),
  animations: PropTypes.shape({
    header: PropTypes.bool,
    counter: PropTypes.bool,
    github: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    animateHeader: PropTypes.func,
    animateCounters: PropTypes.func,
    animateGithub: PropTypes.func,
  }),
};
StatsSection.defaultProps = {
  ...statsProps,
  actions: {
    animateHeader: () => {},
    animateCounters: () => {},
    animateGithub: () => {},
  },
};


const mapStateToProps = state => (state[STATS]);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(statsActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsSection);
