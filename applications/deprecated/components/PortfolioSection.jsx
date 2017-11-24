import React from 'react';
import CSSTransitionGroup from 'preact-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import PortfolioFilterItem from '../components/PortfolioFilterItem.jsx';
import PortfolioItem from '../components/PortfolioItem.jsx';
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
    selectedCategory,
  },
  animations: {
    header,
    filter,
    thumbnail,
  },
  actions: {
    animateHeader,
    animateFilters,
    animateThumbnails,
    changeFilter,
  },
}) => {
  const TransitionGroup = (typeof CSSTransitionGroup === 'function') ? CSSTransitionGroup : 'div';

  return (
    <section id="PORTFOLIO__section">
      <SectionHeader
        title="my works"
        subtitle="what I am proud of"
        shouldAnimate={header}
        onToggleAnimation={animateHeader}
      />
      <div className="PORTFOLIO__wrapper col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <p className="text-gray text-center">
          <span className="fa-stack">
            <i className="fa fa-fw fa-blank fa-stack-2x text-main-light" />
            <i className="fa fa-fw fa-mouse-pointer fa-stack-1x text-white" />
          </span>
          Click for more details about each <span className="main">project</span>.
        </p>

        <div className="PORTFOLIO__area" >
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
              <TransitionGroup
                component="div"
                transitionName="PORTFOLIO__div"
                transitionAppear={false}
                transitionEnter
                transitionEnterTimeout={500}
                transitionLeave
                transitionLeaveTimeout={500}
              >
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
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PortfolioSection.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.string),
    selectedCategory: PropTypes.string,
  }),
  animations: PropTypes.shape({
    header: PropTypes.bool,
    filter: PropTypes.bool,
    thumbnail: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    animateHeader: PropTypes.func,
    animateFilters: PropTypes.func,
    animateThumbnails: PropTypes.func,
    changeFilter: PropTypes.func,
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
