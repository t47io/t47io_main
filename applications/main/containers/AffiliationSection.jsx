import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AffiliationItem from '../components/AffiliationItem.jsx';
import Carousel from '../components/Carousel.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';

import * as affiliationActions from '../actions/affiliationActions.js';
import { noOp } from '../../common/util.js';

import cssType from '../../common/mixins/typography.scss';
import cssUtil from '../stylesheets/util.scss';
import cssAff from '../stylesheets/AffiliationSection.scss';


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
  <section id="AFFILIATION__section" styleName="cssType.text-white" className="text-center">
    <Carousel
      items={backgrounds}
      interval={4000}
    >
      <div styleName="cssUtil.UTIL__spacer-lg" />
      <SectionHeader
        title="who i am"
        subtitle="where I have been"
        shouldAnimate={header}
        onToggleAnimation={animateHeader}
      />

      <div styleName="cssUtil.UTIL__spacer-lg" />
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div styleName="cssAff.AFFILIATION__story">
            <div styleName="cssAff.AFFILIATION__timeline" />

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
      <div styleName="cssUtil.UTIL__spacer-lg" />
    </Carousel>
  </section>
);

AffiliationSection.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    backgrounds: PropTypes.arrayOf(PropTypes.string),
  }),
  animations: PropTypes.shape({
    header: PropTypes.bool,
    panel: PropTypes.number,
  }),
  actions: PropTypes.shape({
    animateHeader: PropTypes.func,
    animatePanels: PropTypes.func,
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
    animateHeader: noOp,
    animatePanels: noOp,
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
