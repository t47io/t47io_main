import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AboutItem from '../components/AboutItem.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import * as aboutActions from '../actions/aboutActions.js';
import { initialState as aboutProps } from '../reducers/about.js';
import { noOp } from '../../common/util.js';
import { ABOUT } from '../constants/sectionTypes.js';

/* eslint-disable no-unused-vars */
import cssUtil from '../stylesheets/util.scss';
import cssAbout from '../stylesheets/AboutSection.scss';
/* eslint-enable */


const AboutSection = ({
  data: { items },
  animations: {
    header,
    icon,
  },
  actions: {
    animateHeader,
    animateIcons,
  },
}) => (
  <section id="ABOUT__section" className="text-center">
    <div styleName="cssUtil.UTIL__spacer-md" />
    <SectionHeader
      title="what i do"
      subtitle="what I enjoy & good at"
      shouldAnimate={header}
      onToggleAnimation={animateHeader}
    />

    <div styleName="cssAbout.ABOUT__content">
      <div className="container">
        <Trigger onToggleAnimation={animateIcons} />
        <div className="row">
          {items.map((item, i) => (
            <AboutItem
              key={`ABOUT__icon-${i}`}
              shouldAnimate={icon}
              index={i}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

AboutSection.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
  }),
  animations: PropTypes.shape({
    header: PropTypes.bool,
    icon: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    animateHeader: PropTypes.func,
    animateIcons: PropTypes.func,
  }),
};
AboutSection.defaultProps = {
  ...aboutProps,
  actions: {
    animateHeader: noOp,
    animateIcons: noOp,
  },
};


const mapStateToProps = state => (state[ABOUT]);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(aboutActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutSection);
