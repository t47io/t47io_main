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
const data = require('../../config.json');


const Main = () => {
  return (
  	<div>
  		<HomeSection />
  		<AboutSection {...(data.about)} />
  		<AffiliationSection {...(data.affiliation)} />
  		<PortfolioSection {...(data.portfolio)} />
  		<SkillsSection {...(data.skills)} />
  		<StatsSection {...(data.stats)} />
  		<PubsSection {...(data.pubs)} />
  		<ContactSection {...(data.contact)} />
		</div>
	);
};

export default Main;
