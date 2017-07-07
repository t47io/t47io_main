import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PortfolioFilterItem from '../components/PortfolioFilterItem.jsx';
import PortfolioItem from '../components/PortfolioItem.jsx';
import PortfolioPowerBy from '../components/PortfolioPowerBy.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import * as portfolioActions from '../actions/portfolioActions.js';
import { initialState as portfolioProps } from '../reducers/portfolio.js';
import { PORTFOLIO } from '../constants/sectionTypes.js';

import '../stylesheets/PortfolioSection.scss';


const PortfolioSection = ({
  data: {
    items,
    categories,
    brands,
    selectedCategory,
  },
  animations: {
    header,
    filter,
    thumbnail,
    brand,
  },
  actions: {
    animateHeader,
    animateFilters,
    animateThumbnails,
    animateBrands,
    changeFilter,
  },
}) => (
  <section id="PORTFOLIO__section">
    <SectionHeader
      title="my works"
      subtitle="what I am proud of"
      shouldAnimate={header}
      onToggleAnimation={animateHeader}
    />

    <div className="row">
      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
      <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
        <p className="text-gray text-center">
          <span className="fa-stack">
            <i className="fa fa-fw fa-blank fa-stack-2x text-main-light" />
            <i className="fa fa-fw fa-mouse-pointer fa-stack-1x text-white" />
          </span>
          Click for more details about each
          <span className="text-main"> project</span>.
        </p>
      </div>
      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
    </div>

    <div className="PORTFOLIO__wrapper col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div className="PORTFOLIO__area">
        <div className="PORTFOLIO__menu">
          <Trigger onToggleAnimation={animateFilters} />
          <ul className="PORTFOLIO__filters">
            {categories.map((category, i) => (
              <PortfolioFilterItem
                key={`PORTFOLIO__filter-${category}`}
                category={category}
                selectedCategory={selectedCategory}
                shouldAnimate={filter}
                index={i}
                onClick={() => changeFilter(category)}
              />
            ))}
          </ul>
        </div>

        <div className="PORTFOLIO__content">
          <Trigger
            delay={500}
            onToggleAnimation={animateThumbnails}
          />
          <div className="PORTFOLIO__div">
            {items.filter(item => (selectedCategory === 'all' || item.category === selectedCategory))
              .map((item, i) => (
                <PortfolioItem
                  key={`PORTFOLIO__item-${item.name}`}
                  shouldAnimate={thumbnail}
                  index={i}
                  {...item}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
      <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
        <div className="UTIL__spacer-lg" />
        <Trigger onToggleAnimation={animateBrands} />
        <PortfolioPowerBy
          items={brands}
          shouldAnimate={brand}
        />
      </div>
      <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
    </div>
  </section>
);

PortfolioSection.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    categories: React.PropTypes.arrayOf(React.PropTypes.string),
    brands: React.PropTypes.arrayOf(React.PropTypes.object),
    selectedCategory: React.PropTypes.string,
  }),
  animations: React.PropTypes.shape({
    header: React.PropTypes.bool,
    filter: React.PropTypes.bool,
    thumbnail: React.PropTypes.bool,
    brand: React.PropTypes.bool,
  }),
  actions: React.PropTypes.shape({
    animateHeader: React.PropTypes.func,
    animateFilters: React.PropTypes.func,
    animateThumbnails: React.PropTypes.func,
    animateBrands: React.PropTypes.func,
    changeFilter: React.PropTypes.func,
  }),
};
PortfolioSection.defaultProps = {
  ...portfolioProps,
  actions: {
    animateHeader: () => {},
    animateFilters: () => {},
    animateThumbnails: () => {},
    changeFilter: () => {},
  },
};


const mapStateToProps = state => (state[PORTFOLIO]);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(portfolioActions, dispatch),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioSection);
