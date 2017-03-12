import React from 'react';

import Scrollspy from '../../common/components/Scrollspy.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import PortfolioFilterItem from '../components/PortfolioFilterItem.jsx';
import PortfolioItem from '../components/PortfolioItem.jsx';

import '../stylesheets/PortfolioSection.scss';


const PortfolioSection = ({
  data: {
    items = [],
    category = [],
  },
  animations: {
    header = true,
    filter = category.length,
    thumbnail = items.length,
  },
  actions: {
    animateHeader = () => {},
    animateFilters = () => {},
    animateThumbnails = () => {},
  },
}) => (
  <section id="PORTFOLIO__section">
    <div className="UTIL__spacer-lg ABOUT__trigger" />
    <SectionHeader
      title="my works"
      subtitle="what I am proud of"
      shouldAniamte={header}
      onToggleAnimation={animateHeader}
    />
    <div
      className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
      style={{ padding: '0' }}
    >
      <p className="text-gray text-center">
        <span className="fa-stack">
          <i className="fa fa-fw fa-blank fa-stack-2x text-light-green" />
          <i className="fa fa-fw fa-mouse-pointer fa-stack-1x text-white" />
        </span>
        Click for more details about each <span className="text-green">project</span>.
      </p>

      <div className="PORTFOLIO__area" >
        <div className="PORTFOLIO__menu">
          <Scrollspy onToggleAnimation={animateFilters} />
          <ul>
            {category.map((name, i) => (
              <PortfolioFilterItem
                key={`PORTFOLIO__filter-${i}`}
                name={name}
                shouldAnimate={i < filter}
                onClick={() => {}}
              />
            ))}
          </ul>
        </div>

        <div className="PORTFOLIO__content">
          <Scrollspy
            delay={500}
            onToggleAnimation={animateThumbnails}
          />
          <div className="PORTFOLIO__div">
            {items.map((item, i) => (
              <PortfolioItem
                key={`PORTFOLIO__item-${i}`}
                shouldAnimate={i < thumbnail}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

PortfolioSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.array,
    category: React.PropTypes.array,
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    filter: React.PropTypes.number,
    thumbnail: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateFilters: React.PropTypes.func,
    animateThumbnails: React.PropTypes.func,
  }),
};


export default PortfolioSection;
