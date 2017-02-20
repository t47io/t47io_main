import React from 'react';
import Waypoint from 'react-waypoint';

import HomeSection from './jsx/home.jsx';
import AboutSection from './jsx/about.jsx';
import AffiliationSection from './jsx/affiliation.jsx';
import PortfolioSection from './jsx/portfolio.jsx';
import SkillsSection from './jsx/skills.jsx';
import StatsSection from './jsx/stats.jsx';
import PubsSection from './jsx/pubs.jsx';
import ContactSection from './jsx/contact.jsx';

import Navbar from '../common/jsx/navbar.jsx';
import Footer from '../common/jsx/footer.jsx';
import ScrollTop from '../common/jsx/scrolltop.jsx';


require('./index.scss');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      scroll: {
        section: 'home',
        top: true,
        bottom: false,
      },
    });

    this.onEnterSection = this.onEnterSection.bind(this);
    this.onScrollNavbar = this.onScrollNavbar.bind(this);
    this.onScrollFooter = this.onScrollFooter.bind(this);
  }

  onEnterSection(section) {
    this.setState({
      scroll: {
        ...(this.state.scroll),
        section,
      },
    });
  }
  onScrollNavbar({ currentPosition }) {
    this.setState({
      scroll: {
        ...(this.state.scroll),
        top: currentPosition === 'inside',
      },
    });
  }
  onScrollFooter({ currentPosition }) {
    this.setState({
      scroll: {
        ...(this.state.scroll),
        bottom: currentPosition === 'inside',
      },
    });
  }

  render() {
    const { home, about, affiliation, portfolio, skills, stats, pubs, contact } = this.props;
    const { scroll } = this.state;

    return (
      <div>
        <Navbar items={home.sections} {...scroll} />

        <Waypoint onEnter={() => this.onEnterSection('home')} />
        <HomeSection {...home} />

        <Waypoint onEnter={() => this.onEnterSection('about')} />
        <Waypoint topOffset="200px" onPositionChange={this.onScrollNavbar} />
        <AboutSection {...about} />
        <AffiliationSection {...affiliation} />

        <Waypoint onEnter={() => this.onEnterSection('portfolio')} />
        <PortfolioSection {...portfolio} />
        <SkillsSection {...skills} />
        <StatsSection {...stats} />
        <PubsSection {...pubs} />

        <Waypoint onEnter={() => this.onEnterSection('contact')} />
        <ContactSection {...contact} />

        <Waypoint onPositionChange={this.onScrollFooter} />
        <Footer />
        <ScrollTop {...scroll} />
      </div>
    );
  }
}
Main.propTypes = {
  home: React.PropTypes.object.isRequired,
  about: React.PropTypes.object.isRequired,
  affiliation: React.PropTypes.object.isRequired,
  portfolio: React.PropTypes.object.isRequired,
  skills: React.PropTypes.object.isRequired,
  stats: React.PropTypes.object.isRequired,
  pubs: React.PropTypes.object.isRequired,
  contact: React.PropTypes.object.isRequired,
};


export default Main;
