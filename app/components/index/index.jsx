import React from 'react';

import HomeSection from './jsx/home.jsx';
import AboutSection from './jsx/about.jsx';
import AffiliationSection from './jsx/affiliation.jsx';
import PortfolioSection from './jsx/portfolio.jsx';
import SkillsSection from './jsx/skills.jsx';
import StatsSection from './jsx/stats.jsx';
import PubsSection from './jsx/pubs.jsx';
import ContactSection from './jsx/contact.jsx';

import Footer from '../common/jsx/footer.jsx';


require('./index.scss');
const data = require('../../../public/config.json');

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
    this.setState(data);
  }
  componentDidMount() {
    // require('script!./js/scroll.js');
  }

  render() {
    return (
    	<div>
    		<HomeSection {...(this.state.home)} />
    		<AboutSection {...(this.state.about)} />
    		<AffiliationSection {...(this.state.affiliation)} />
    		<PortfolioSection {...(this.state.portfolio)} />
    		<SkillsSection {...(this.state.skills)} />
    		<StatsSection {...(this.state.stats)} />
    		<PubsSection {...(this.state.pubs)} />
    		<ContactSection {...(this.state.contact)} />

        <Footer />
  		</div>
  	);
  }
};


export default Main;
