import React from 'react';
import ReactTooltip from 'react-tooltip';

import Trigger from '../../common/components/Trigger.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import PubsYearPanel from '../components/PubsYearPanel.jsx';

import '../stylesheets/PubsSection.scss';


const PubsSection = ({
  data: {
    items = [],
    links: {
      googleScholar = '',
      pubmed = '',
    },
  },
  animations: {
    header = true,
    entry = items.length,
  },
  actions: {
    animateHeader = () => {},
    animateEntries = () => {},
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

    <div className="container">
      <Trigger onToggleAnimation={animateEntries} />
      {items.map(item => (
        <PubsYearPanel
          key={`PUBS__panel-${item.year}`}
          counter={entry}
          {...item}
        />
      ))}
      <ReactTooltip effect="solid" place="bottom" id="PUBS__tooltip" />

      <div className="UTIL__spacer-lg" />
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
        <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
          <h4 className="text-gray text-center">
            <span className="fa-stack">
              <i className="fa fa-fw fa-blank fa-stack-2x text-light-green" />
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
          </h4>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
      </div>
    </div>
    <div className="UTIL__spacer-xl CONTACT__trigger" />
  </section>
);

PubsSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.array,
    links: React.PropTypes.shape({
      googleScholar: React.PropTypes.string,
      pubmed: React.PropTypes.string,
    }),
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    entry: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateEntries: React.PropTypes.func,
  }),
};


export default PubsSection;
