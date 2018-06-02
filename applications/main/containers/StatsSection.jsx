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
import { noOp } from '../../common/util.js';
import { STATS } from '../constants/sectionTypes.js';
import { GITHUB_HOST } from '../../config.js';

/* eslint-disable */
import cssType from '../../common/mixins/typography.scss';
import cssUtil from '../stylesheets/util.scss';
import cssStats from '../stylesheets/StatsSection.scss';
/* eslint-enable */


const StatsSection = ({
  data: {
    items,
    backgrounds,
    accounts,
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
      items={backgrounds}
      interval={4000}
    >
      <div styleName="cssStats.STATS__area cssType.text-white">
        <div styleName="cssUtil.UTIL__spacer-lg" />
        <SectionHeader
          title="my stats"
          subtitle="what I achieved"
          shouldAnimate={header}
          onToggleAnimation={animateHeader}
        />
        <div styleName="cssUtil.UTIL__spacer-lg" />

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
        <div styleName="cssUtil.UTIL__spacer-lg" />
      </div>
    </Carousel>

    <div styleName="cssUtil.UTIL__spacer-xl" />
    <h3 className="text-center">
      <i className="fa fa-fw fa-github-circled" />
      Contributions
      <small styleName="cssStats.STATS__note-link">
        <a
          href={`${GITHUB_HOST}${accounts[0]}`}
          target="_blank" rel="noopener noreferrer external"
        >
          <i className="fa fa-fw fa-sm fa-link-ext" />
        </a>
      </small>
    </h3>

    <div styleName="cssUtil.UTIL__spacer-md" />
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
    accounts: PropTypes.arrayOf(PropTypes.string),
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
    animateHeader: noOp,
    animateCounters: noOp,
    animateGithub: noOp,
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
