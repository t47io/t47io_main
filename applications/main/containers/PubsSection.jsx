import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PubsThesis from '../components/PubsThesis.jsx';
import PubsYearPanel from '../components/PubsYearPanel.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import * as pubsActions from '../actions/pubsActions.js';
import { initialState as pubsProps } from '../reducers/pubs.js';
import { PUBS } from '../constants/sectionTypes.js';

import '../stylesheets/PubsSection.scss';


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
      sizes,
    },
  },
  animations: {
    header,
    entry,
  },
  actions: {
    animateHeader,
    animateEntries,
  },
}) => (
  <section id="PUBS__section">
    <div className="UTIL__spacer-md PUBS__trigger" />
    <SectionHeader
      title="my research"
      subtitle="what I published"
      shouldAnimate={header}
      onToggleAnimation={animateHeader}
    />

    <div className="row">
      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
      <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
        <p className="PUBS__find-more text-gray text-center">
          <span className="fa-stack">
            <i className="fa fa-fw fa-blank fa-stack-2x text-main-light" />
            <i className="fa fa-fw fa-search fa-stack-1x text-white" />
          </span>
          Find more on
          <a
            href={googleScholar}
            target="_blank" rel="noopener noreferrer external"
            className="PUBS__link"
          >
            Google Scholar
            <i className="fa fa-fw fa-sm fa-link-ext" />
          </a>
          and
          <a
            href={pubmed}
            target="_blank" rel="noopener noreferrer external"
            className="PUBS__link"
          >
            PubMed
            <i className="fa fa-fw fa-sm fa-link-ext" />
          </a>.
        </p>
      </div>
      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
    </div>

    <div className="UTIL__spacer-md" />
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
        effect="solid" place="bottom"
        insecure={false}
      />
    </div>

    <div className="UTIL__spacer-lg" />
    <PubsThesis
      title={title}
      url={url}
      sizes={sizes}
    />
    <div className="UTIL__spacer-xl CONTACT__trigger" />
  </section>
);

PubsSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    links: React.PropTypes.shape({
      googleScholar: React.PropTypes.string,
      pubmed: React.PropTypes.string,
    }),
    thesis: React.PropTypes.shape({
      title: React.PropTypes.string,
      url: React.PropTypes.string,
      sizes: React.PropTypes.object,
    }),
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    entry: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateEntries: React.PropTypes.func,
  }),
};
PubsSection.defaultProps = {
  ...pubsProps,
  actions: {
    animateHeader: () => {},
    animateEntries: () => {},
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
