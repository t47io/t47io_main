import React from 'react';
import { SparkScroll } from '../../common/js/factory.js';

import { portfolio as tween } from '../js/tweens.js';


const PortfolioFilterItem = ({
  name,
  filter,
  onClick,
  index,
}) => (
  <SparkScroll.li
    className={(name === filter) ? 'active' : ''}
    proxy="PORTFOLIO__menu"
    timeline={tween.menu(index * 20)}
  >
    <a data-filter={name} onClick={onClick}>
      {name.replace(/-/g, ' ')}
    </a>
  </SparkScroll.li>
);

PortfolioFilterItem.propTypes = {
  name: React.PropTypes.string,
  filter: React.PropTypes.string,
  onClick: React.PropTypes.func,
  index: React.PropTypes.number,
};


export default PortfolioFilterItem;
