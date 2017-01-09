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
        bottom: false
      }
    });
  }

  onEnterSection(section) {
    this.setState({
      scroll: {
        ...(this.state.scroll),
        section
      }
    });
  }
  onScrollNavbar({currentPosition}) {
    this.setState({
      scroll: {
        ...(this.state.scroll),
        top: currentPosition === 'inside'
      }
    });
  }
  onScrollFooter({currentPosition}) {
    this.setState({
      scroll: {
        ...(this.state.scroll),
        bottom: currentPosition === 'inside'
      }
    });
  }

  render() {
    const {home, about, affiliation, portfolio, skills, stats, pubs, contact} = this.props, {scroll} = this.state;

    return (
    	<div>
        <Navbar items={home.sections} {...scroll} />

        <Waypoint onEnter={this.onEnterSection.bind(this, 'home')} />
    		<HomeSection {...home} />

        <Waypoint onEnter={this.onEnterSection.bind(this, 'about')} />
        <Waypoint topOffset="200px" onPositionChange={this.onScrollNavbar.bind(this)} />
    		<AboutSection {...about} />
    		<AffiliationSection {...affiliation} />

        <Waypoint onEnter={this.onEnterSection.bind(this, 'portfolio')} />
    		<PortfolioSection {...portfolio} />
    		<SkillsSection {...skills} />
    		<StatsSection {...stats} />
    		<PubsSection {...pubs} />

        <Waypoint onEnter={this.onEnterSection.bind(this, 'contact')} />
    		<ContactSection {...contact} />

        <Waypoint onPositionChange={this.onScrollFooter.bind(this)} />
        <Footer />
        <ScrollTop {...scroll} />
  		</div>
  	);
  }
};


export default Main;
