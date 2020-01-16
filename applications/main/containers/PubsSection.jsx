import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import PubsThesis from '../components/PubsThesis.jsx';
import PubsYearPanel from '../components/PubsYearPanel.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import * as pubsActions from '../actions/pubsActions.js';
import { initialState as pubsProps } from '../reducers/pubs.js';
import { noOp } from '../../common/util.js';
import { PUBS } from '../constants/sectionTypes.js';

import cssType from '../../common/mixins/typography.scss';
import cssUtil from '../stylesheets/util.scss';
import cssPubs from '../stylesheets/PubsSection.scss';


const PubsSection = ({
  data: {
    items,
    links: {
      googleScholar,
      pubmed,
    },
    thesis: {
      title,
      url,
      links,
    },
  },
  animations: {
    header,
    entry,
    thesis,
  },
  actions: {
    animateHeader,
    animateEntries,
    animateThesis,
  },
}) => (
  <section id="PUBS__section">
    <div styleName="cssUtil.UTIL__spacer-md" />
    <SectionHeader
      title="my research"
      subtitle="what I published"
      shouldAnimate={header}
      onToggleAnimation={animateHeader}
    />

    <div className="row">
      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
      <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
        <p styleName="cssPubs.PUBS__find-more cssType.text-gray" className="text-center">
          <span className="fa-stack">
            <i styleName="cssType.text-main-light" className="fa fa-fw fa-blank fa-stack-2x" />
            <i styleName="cssType.text-white" className="fa fa-fw fa-search fa-stack-1x" />
          </span>
          Find more on
          <a
            href={googleScholar}
            target="_blank"
            rel="noopener noreferrer external"
            styleName="cssPubs.PUBS__link"
          >
            Google Scholar
            <i className="fa fa-fw fa-sm fa-link-ext" />
          </a>
          and
          <a
            href={pubmed}
            target="_blank"
            rel="noopener noreferrer external"
            styleName="cssPubs.PUBS__link"
          >
            PubMed
            <i className="fa fa-fw fa-sm fa-link-ext" />
          </a>.
        </p>
      </div>
      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
    </div>

    <div styleName="cssUtil.UTIL__spacer-md" />
    <div className="container">
      <Trigger onToggleAnimation={animateEntries} />
      {items.map(item => (
        <PubsYearPanel
          key={`PUBS__panel-${item.year}`}
          counter={entry}
          {...item}
        />
      ))}
      <ReactTooltip
        id="PUBS__tooltip"
        effect="solid"
        place="bottom"
        insecure={false}
      />
    </div>

    <div styleName="cssUtil.UTIL__spacer-lg" />
    <Trigger onToggleAnimation={animateThesis} />
    <PubsThesis
      title={title}
      url={url}
      links={links}
      shouldAnimate={thesis}
    />
    <div styleName="cssUtil.UTIL__spacer-xl" />
  </section>
);

PubsSection.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    links: PropTypes.shape({
      googleScholar: PropTypes.string,
      pubmed: PropTypes.string,
    }),
    thesis: PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      links: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  animations: PropTypes.shape({
    header: PropTypes.bool,
    entry: PropTypes.bool,
    thesis: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    animateHeader: PropTypes.func,
    animateEntries: PropTypes.func,
    animateThesis: PropTypes.func,
  }),
};
PubsSection.defaultProps = {
  ...pubsProps,
  actions: {
    animateHeader: noOp,
    animateEntries: noOp,
    animateThesis: noOp,
  },
};


const mapStateToProps = state => (state[PUBS]);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(pubsActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PubsSection);
