import React from 'react';
import $ from 'webpack-zepto';

import HomeSection from './jsx/home.jsx';
import AboutSection from './jsx/about.jsx';
import AffiliationSection from './jsx/affiliation.jsx';
import PortfolioSection from './jsx/portfolio.jsx';
import SkillsSection from './jsx/skills.jsx';
import StatsSection from './jsx/stats.jsx';
import PubsSection from './jsx/pubs.jsx';
import ContactSection from './jsx/contact.jsx';

require('./index.scss');


class Main extends React.Component {
  getInitialState() {
    return {
      about: {items: []},
      affiliation: {items: []},
      portfolio: {items: [], category: []},
      skills: {items: {left: [], right: []}},
      stats: {items: [], git: ""},
      pubs: {items: []},
      contact: {items: [], resume: ""}
    }
  }

  componentDidMount() {
    $.getJSON('/config.json', (data) => { this.setState(data); })
  }

  render() {
    return (
    	<div>
    		<HomeSection />
    		<AboutSection {...(this.state.about)} />
    		<AffiliationSection {...(this.state.affiliation)} />
    		<PortfolioSection {...(this.state.portfolio)} />
    		<SkillsSection {...(this.state.skills)} />
    		<StatsSection {...(this.state.stats)} />
    		<PubsSection {...(this.state.pubs)} />
    		<ContactSection {...(this.state.contact)} />
  		</div>
  	);
  }
};


export default Main;
