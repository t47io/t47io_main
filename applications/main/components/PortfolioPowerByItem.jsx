import React from 'react';
import PropTypes from 'prop-types';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { imgBrands } from './Images.js';
import { portfolioBrandItem } from '../animations/portfolio.js';
import { TARGET_BLANK } from '../../common/constants/util.js';

import '../stylesheets/PortfolioSection.scss';


const PortfolioPowerByItem = ({
  name,
  url,
  shouldAnimate,
  index,
}) => {
  const Svg = imgBrands[name].default;

  return (
    <WebAnimation
      tagName="li"
      styleName="PORTFOLIO__brand-item"
      keyframes={portfolioBrandItem.keyframes}
      timing={portfolioBrandItem.timing(index)}
      shouldAnimate={shouldAnimate}
      data-tip={name}
      data-for="PORTFOLIO__tooltip"
    >
      <a href={url} {...TARGET_BLANK}>
        <Svg />
      </a>
    </WebAnimation>
  );
};

PortfolioPowerByItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  index: PropTypes.number,
};
PortfolioPowerByItem.defaultProps = {
  name: '',
  url: '',
  shouldAnimate: false,
  index: 0,
};


export default PortfolioPowerByItem;
