import React from 'react';
import PropTypes from 'prop-types';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { portfolioFilterItem } from '../animations/portfolio.js';
import { noOp } from '../../common/util.js';


const PortfolioFilterItem = ({
  category,
  selectedCategory,
  shouldAnimate,
  index,
  onClick,
}) => {
  const activeClassName = (category === selectedCategory) ? 'active' : '';

  return (
    <WebAnimation
      tagName="li"
      className={`PORTFOLIO__filter-item ${activeClassName}`}
      keyframes={portfolioFilterItem.keyframes}
      timing={portfolioFilterItem.timing(index)}
      shouldAnimate={shouldAnimate}
      propsForceUpdate={activeClassName}
    >
      <a
        className="PORTFOLIO__filter-link"
        onClick={onClick}
        role="presentation"
      >
        {category.replace(/-/g, ' ')}
      </a>
    </WebAnimation>
  );
};

PortfolioFilterItem.propTypes = {
  category: PropTypes.string,
  selectedCategory: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func,
};
PortfolioFilterItem.defaultProps = {
  category: '',
  selectedCategory: 'all',
  shouldAnimate: false,
  index: 0,
  onClick: noOp,
};


export default PortfolioFilterItem;
