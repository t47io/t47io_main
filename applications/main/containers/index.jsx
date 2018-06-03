import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import HomeSection from './HomeSection.jsx';
import AboutSection from './AboutSection.jsx';
import AffiliationSection from './AffiliationSection.jsx';
import PortfolioSection from './PortfolioSection.jsx';
import SkillsSection from './SkillsSection.jsx';
import StatsSection from './StatsSection.jsx';
import PubsSection from './PubsSection.jsx';
import ContactSection from './ContactSection.jsx';

import Meta from '../components/Meta.jsx';
import Navbar from '../../common/containers/Navbar.jsx';
import Footer from '../../common/containers/Footer.jsx';
import ScrollSpy from '../../common/components/ScrollSpy.jsx';
import ScrollTop from '../../common/components/ScrollTop.jsx';
import ScrollDown from '../components/ScrollDown.jsx';

import {
  scrollToSection,
  updateNavbarScrollspy,
} from '../../common/actions/navbarActions.js';
import { noOp } from '../../common/util.js';
import {
  NAVBAR,
  FOOTER,
} from '../../common/constants/sectionTypes.js';
import { HOME } from '../constants/sectionTypes.js';

/* eslint-disable */
import cssVendor from '../../vendor/index.scss';
import cssMain from '../stylesheets/index.scss';
/* eslint-enable */


const Main = ({
  isLoaded,
  hideScrollTop,
  onUpdateScroll,
  onScrollTop,
}) => {
  if (!isLoaded) { return null; }

  return (
    <div>
      <Meta />
      <Navbar />

      <ScrollSpy
        section={0}
        topOffset="68px"
        onUpdateScroll={onUpdateScroll}
      >
        <HomeSection />
        <ScrollDown onScrollTop={onScrollTop} />
      </ScrollSpy>

      <ScrollSpy
        section={1}
        onUpdateScroll={onUpdateScroll}
      >
        <AboutSection />
        <AffiliationSection />
      </ScrollSpy>

      <ScrollSpy
        section={2}
        onUpdateScroll={onUpdateScroll}
      >
        <PortfolioSection />
        <SkillsSection />
        <StatsSection />
        <PubsSection />
      </ScrollSpy>

      <ScrollSpy
        section={3}
        onUpdateScroll={onUpdateScroll}
      >
        <ContactSection />
      </ScrollSpy>

      <Footer />
      <ScrollTop
        isHidden={hideScrollTop}
        onScrollTop={onScrollTop}
      />
    </div>
  );
};

Main.propTypes = {
  isLoaded: PropTypes.bool,
  hideScrollTop: PropTypes.bool,
  onUpdateScroll: PropTypes.func,
  onScrollTop: PropTypes.func,
};
Main.defaultProps = {
  isLoaded: false,
  hideScrollTop: true,
  onUpdateScroll: noOp,
  onScrollTop: noOp,
};


const mapStateToProps = state => ({
  isLoaded: state[HOME].data.loaded,
  hideScrollTop: (state[NAVBAR].animations.activeSection === HOME ||
    state[FOOTER].animations.footer),
});
const mapDispatchToProps = dispatch => ({
  onUpdateScroll: bindActionCreators(updateNavbarScrollspy, dispatch),
  onScrollTop: bindActionCreators(scrollToSection, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
