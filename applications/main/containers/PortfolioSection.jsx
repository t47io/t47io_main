import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import PortfolioFilterItem from '../components/PortfolioFilterItem.jsx';
import PortfolioItem from '../components/PortfolioItem.jsx';
import PortfolioPowerBy from '../components/PortfolioPowerBy.jsx';
import SectionHeader from '../../common/components/SectionHeader.jsx';
import Trigger from '../../common/components/Trigger.jsx';

import * as portfolioActions from '../actions/portfolioActions.js';
import { initialState as portfolioProps } from '../reducers/portfolio.js';
import { noOp } from '../../common/util.js';
import { PORTFOLIO } from '../constants/sectionTypes.js';

/* eslint-disable */
import cssType from '../../common/mixins/typography.scss';
import cssUtil from '../stylesheets/util.scss';
import cssPort from '../stylesheets/PortfolioSection.scss';
/* eslint-enable */


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
}) => {
  const filteredItems = items.filter(item => (selectedCategory === 'all' || item.category === selectedCategory));

  return (
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
          <p styleName="cssType.text-gray" className="text-center">
            <span className="fa-stack">
              <i styleName="cssType.text-main-light" className="fa fa-fw fa-blank fa-stack-2x" />
              <i styleName="cssType.text-white" className="fa fa-fw fa-mouse-pointer fa-stack-1x" />
            </span>
            Click for more details about each
            <span styleName="cssType.text-main"> project</span>.
          </p>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
      </div>

      <div styleName="cssPort.PORTFOLIO__wrapper" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div styleName="cssPort.PORTFOLIO__area">
          <div styleName="cssPort.PORTFOLIO__menu">
            <Trigger onToggleAnimation={animateFilters} />
            <ul styleName="cssPort.PORTFOLIO__filters">
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

          <div styleName="cssPort.PORTFOLIO__content">
            <Trigger
              delay={500}
              onToggleAnimation={animateThumbnails}
            />
            <div styleName="cssPort.PORTFOLIO__div">
              {filteredItems.map((item, i) => (
                <PortfolioItem
                  key={`PORTFOLIO__item-${item.name}`}
                  shouldAnimate={thumbnail}
                  index={i}
                  {...item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
        <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
          <div styleName="cssUtil.UTIL__spacer-lg" />
          <PortfolioPowerBy
            items={brands}
            shouldAnimate={brand}
          />
          <Trigger
            delay={500}
            onToggleAnimation={animateBrands}
          />
        </div>
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
      </div>
    </section>
  );
};

PortfolioSection.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.string),
    brands: PropTypes.arrayOf(PropTypes.object),
    selectedCategory: PropTypes.string,
  }),
  animations: PropTypes.shape({
    header: PropTypes.bool,
    filter: PropTypes.bool,
    thumbnail: PropTypes.bool,
    brand: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    animateHeader: PropTypes.func,
    animateFilters: PropTypes.func,
    animateThumbnails: PropTypes.func,
    animateBrands: PropTypes.func,
    changeFilter: PropTypes.func,
  }),
};
PortfolioSection.defaultProps = {
  ...portfolioProps,
  actions: {
    animateHeader: noOp,
    animateFilters: noOp,
    animateThumbnails: noOp,
    changeFilter: noOp,
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
