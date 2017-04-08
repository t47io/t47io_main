import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AffiliationItem from '../components/AffiliationItem.jsx';
import Carousel from '../../common/components/Carousel.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';

import * as affiliationActions from '../actions/affiliationActions.js';

import '../stylesheets/AffiliationSection.scss';


const AffiliationSection = ({
  data: {
    items,
    backgrounds,
  },
  animations: {
    header,
    panel,
  },
  actions: {
    animateHeader,
    animatePanels,
  },
}) => (
  <section id="AFFILIATION__section" className="text-center">
    <Carousel
      className="text-white"
      items={backgrounds} interval={4000}
    >
      <div className="UTIL__spacer-lg AFFILIATION__trigger" />
      <SectionHeader
        title="who i am"
        subtitle="where I have been"
        shouldAnimate={header}
        onToggleAnimation={animateHeader}
      />

      <div className="UTIL__spacer-lg" />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="AFFILIATION__story">
            <div className="AFFILIATION__timeline" />

            {items.map((item, i) => (
              <AffiliationItem
                key={`AFFILIATION__item-${i}`}
                shouldAnimate={panel === i}
                onToggleAnimation={animatePanels}
                index={i}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="UTIL__spacer-lg" />
    </Carousel>
  </section>
);

AffiliationSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    backgrounds: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    panel: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animatePanels: React.PropTypes.func,
  }),
};
AffiliationSection.defaultProps = {
  data: {
    items: [],
    backgrounds: [],
  },
  animations: {
    header: false,
    panel: 0,
  },
  actions: {
    animateHeader: () => {},
    animatePanels: () => {},
  },
};


const mapStateToProps = state => (state.affiliation);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(affiliationActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AffiliationSection);
