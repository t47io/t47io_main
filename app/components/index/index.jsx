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


require('./index.scss');
const data = require('../../../public/config.json');
const svg = require(`../../../public/data/${data.stats.git}`);


// require('script!zepto');
// require('script!shufflejs');


class Main extends React.Component {
  componentWillMount() {
    // $.ajax({
    //   type: 'GET',
    //   url: '/config.json', 
    //   async: false,
    //   success: (data) => { this.setState(data); }
    // });
    this.setState({
      ...data,
      sections: ['home', 'about', 'portfolio', 'contact'],
      scroll: {
        section: 'home',
        top: true,
        bottom: false
      }
    });
  }
  componentDidMount() {
    // require('script!./js/scroll.js');
  }

  onEnterSection(section) {
    this.setState({
      ...(this.state),
      scroll: {
        ...(this.state.scroll),
        section
      }
    });
  }
  onScrollNavbar({currentPosition}) {
    this.setState({
      ...(this.state),
      scroll: {
        ...(this.state.scroll),
        top: currentPosition === 'inside'
      }
    });
  }
  onScrollFooter({currentPosition}) {
    this.setState({
      ...(this.state),
      scroll: {
        ...(this.state.scroll),
        bottom: currentPosition === 'inside'
      }
    });
  }

  render() {
    return (
    	<div>
        <Navbar items={this.state.sections} {...(this.state.scroll)} />

        <Waypoint onEnter={this.onEnterSection.bind(this, 'home')} />
    		<HomeSection {...(this.state.home)} />

        <Waypoint onEnter={this.onEnterSection.bind(this, 'about')} />
        <Waypoint topOffset="200px" onPositionChange={this.onScrollNavbar.bind(this)} />
    		<AboutSection {...(this.state.about)} />
    		<AffiliationSection {...(this.state.affiliation)} />

        <Waypoint onEnter={this.onEnterSection.bind(this, 'portfolio')} />
    		<PortfolioSection {...(this.state.portfolio)} />
    		<SkillsSection {...(this.state.skills)} />
    		<StatsSection {...(this.state.stats)} svg={svg} />
    		<PubsSection {...(this.state.pubs)} />

        <Waypoint onEnter={this.onEnterSection.bind(this, 'contact')} />
    		<ContactSection {...(this.state.contact)} />

        <Waypoint onPositionChange={this.onScrollFooter.bind(this)} />
        <Footer />
        <a href="#HOME__section" className="scrollTop"
          style={{opacity: this.state.scroll.top || this.state.scroll.bottom ? 0 : 1, visibility: this.state.scroll.top || this.state.scroll.bottom ? "hidden" : "visible"}} >
          <i className="fa fa-arrow-up fa-fw fa-lg"></i>
        </a>
  		</div>
  	);
  }
};


export default Main;
