import React from 'react';

import HomeSection from './home/home.jsx';
import AboutSection from './about/about.jsx';
import AffiliationSection from './affiliation/affiliation.jsx';
import PortfolioSection from './portfolio/portfolio.jsx';
import SkillsSection from './skills/skills.jsx';
import StatsSection from './stats/stats.jsx';
import PubsSection from './pubs/pubs.jsx';
import ContactSection from './contact/contact.jsx';

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
