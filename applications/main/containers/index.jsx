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

import Navbar from '../../common/components/Navbar.jsx';
import Footer from '../../common/components/Footer.jsx';
import ScrollSpy from '../../common/components/ScrollSpy.jsx';
import ScrollTop from '../../common/components/ScrollTop.jsx';

import * as homeActions from '../actions/homeActions.js';
import * as aboutActions from '../actions/aboutActions.js';
import * as affiliationActions from '../actions/affiliationActions.js';
import * as portfolioActions from '../actions/portfolioActions.js';
import * as skillsActions from '../actions/skillsActions.js';
import * as statsActions from '../actions/statsActions.js';
import * as pubsActions from '../actions/pubsActions.js';
import * as contactActions from '../actions/contactActions.js';

import * as navbarActions from '../../common/actions/navbarActions.js';
import * as footerActions from '../../common/actions/footerActions.js';

import { HOME } from '../constants/sectionTypes.js';

import '../stylesheets/index.scss';
import '../stylesheets/animations.scss';


const mapStateToProps = (state) => {
  const props = {
    data: {},
    form: {},
    animations: {},
  };
  Object.keys(state).forEach((key) => {
    props.data[key] = state[key].data;
    props.animations[key] = state[key].animations;
  });
  props.form = state.contact.form;
  return props;
};
const mapDispatchToProps = dispatch => ({
  actions: {
    home: bindActionCreators(homeActions, dispatch),
    about: bindActionCreators(aboutActions, dispatch),
    affiliation: bindActionCreators(affiliationActions, dispatch),
    portfolio: bindActionCreators(portfolioActions, dispatch),
    skills: bindActionCreators(skillsActions, dispatch),
    stats: bindActionCreators(statsActions, dispatch),
    pubs: bindActionCreators(pubsActions, dispatch),
    contact: bindActionCreators(contactActions, dispatch),

    navbar: bindActionCreators(navbarActions, dispatch),
    footer: bindActionCreators(footerActions, dispatch),
  },
});


class Main extends React.PureComponent {
  componentDidMount() {
    this.props.actions.home.loadJsonData();
  }

  render() {
    const { data, form, animations, actions } = this.props;
    const { home } = data;
    const onUpdateScroll = actions.navbar.updateNavbarScrollspy;
    const hideScrollTop = (animations.navbar.activeSection === HOME || animations.footer.footer);

    return (
      <div>
        <Navbar
          data={data.navbar}
          animations={animations.navbar}
          actions={actions.navbar}
        />

        <ScrollSpy
          section={0}
          topOffset="108px"
          onUpdateScroll={onUpdateScroll}
        >
          <HomeSection
            {...home}
          />
        </ScrollSpy>

        <ScrollSpy
          section={1}
          onUpdateScroll={onUpdateScroll}
        >
          <AboutSection
            data={data.about}
            animations={animations.about}
            actions={actions.about}
          />
          <AffiliationSection
            data={data.affiliation}
            animations={animations.affiliation}
            actions={actions.affiliation}
          />
        </ScrollSpy>

        <ScrollSpy
          section={2}
          topOffset="108px"
          onUpdateScroll={onUpdateScroll}
        >
          <PortfolioSection
            data={data.portfolio}
            animations={animations.portfolio}
            actions={actions.portfolio}
          />
          <SkillsSection
            data={data.skills}
            animations={animations.skills}
            actions={actions.skills}
          />
          <StatsSection
            data={data.stats}
            animations={animations.stats}
            actions={actions.stats}
          />
          <PubsSection
            data={data.pubs}
            animations={animations.pubs}
            actions={actions.pubs}
          />
        </ScrollSpy>

        <ScrollSpy
          section={3}
          topOffset="-108px"
          onUpdateScroll={onUpdateScroll}
        >
          <ContactSection
            data={data.contact}
            form={form}
            animations={animations.contact}
            actions={actions.contact}
          />
          <Footer
            animations={animations.footer}
            actions={actions.footer}
          />
        </ScrollSpy>

        <ScrollTop isHidden={hideScrollTop} />
      </div>
    );
  }
}

Main.propTypes = {
  data: React.PropTypes.object,
  form: React.PropTypes.object,
  animations: React.PropTypes.object,
  actions: React.PropTypes.object,
};
Main.defaultProps = {
  data: {},
  form: {},
  animations: {},
  actions: {},
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
