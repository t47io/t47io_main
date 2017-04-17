import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'web-animations-js/web-animations.min.js';

import HomeSection from './HomeSection.jsx';
import AboutSection from './AboutSection.jsx';
import AffiliationSection from './AffiliationSection.jsx';
import PortfolioSection from './PortfolioSection.jsx';
import SkillsSection from './SkillsSection.jsx';
import StatsSection from './StatsSection.jsx';
import PubsSection from './PubsSection.jsx';
import ContactSection from './ContactSection.jsx';

import Navbar from '../../common/containers/Navbar.jsx';
import Footer from '../../common/containers/Footer.jsx';
import ScrollSpy from '../../common/components/ScrollSpy.jsx';
import ScrollTop from '../../common/components/ScrollTop.jsx';

import {
  scrollToSection,
  updateNavbarScrollspy,
} from '../../common/actions/navbarActions.js';
import { HOME } from '../constants/sectionTypes.js';

import '../stylesheets/index.scss';


const Main = ({
  isLoaded,
  hideScrollTop,
  onUpdateScroll,
  onScrollTop,
}) => {
  if (!isLoaded) { return null; }

  return (
    <div>
      <Navbar />

      <ScrollSpy
        section={0}
        topOffset="68px"
        onUpdateScroll={onUpdateScroll}
      >
        <HomeSection />
      </ScrollSpy>
      <div className="UTIL__spacer-sm" />

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
        <Footer />
      </ScrollSpy>

      <ScrollTop
        isHidden={hideScrollTop}
        onScrollTop={onScrollTop}
      />
    </div>
  );
};

Main.propTypes = {
  isLoaded: React.PropTypes.bool,
  hideScrollTop: React.PropTypes.bool,
  onUpdateScroll: React.PropTypes.func,
  onScrollTop: React.PropTypes.func,
};
Main.defaultProps = {
  isLoaded: false,
  hideScrollTop: true,
  onUpdateScroll: () => {},
  onScrollTop: () => {},
};


const mapStateToProps = state => ({
  isLoaded: state.home.data.loaded,
  hideScrollTop: (state.navbar.animations.activeSection === HOME ||
    state.footer.animations.footer),
});
const mapDispatchToProps = dispatch => ({
  onUpdateScroll: bindActionCreators(updateNavbarScrollspy, dispatch),
  onScrollTop: bindActionCreators(scrollToSection, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
