import React from 'react';

import HomeSection from './jsx/home.jsx';
import AboutSection from './jsx/about.jsx';
import AffiliationSection from './jsx/affiliation.jsx';
import PortfolioSection from './jsx/portfolio.jsx';
import SkillsSection from './jsx/skills.jsx';
import StatsSection from './jsx/stats.jsx';
import PubsSection from './jsx/pubs.jsx';
import ContactSection from './jsx/contact.jsx';

require('./index.scss');


const Main = () => {
  return (
  	<div>
  		<HomeSection />
  		<AboutSection />
  		<AffiliationSection />
  		<PortfolioSection />
  		<SkillsSection />
  		<StatsSection />
  		<PubsSection />
  		<ContactSection />
		</div>
	);
};

export default Main;
