import React from 'react';

import WebAnimation from '../../common/components/WebAnimation.jsx';

import { portfolioBrandItem } from '../animations/portfolio.js';


const PortfolioPowerByItem = ({
  name,
  url,
  icon,
  shouldAnimate,
  index,
}) => (
  <WebAnimation
    tagName="li"
    className="PORTFOLIO__brand-item"
    keyframes={portfolioBrandItem.keyframes}
    timing={portfolioBrandItem.timing(index)}
    shouldAnimate={shouldAnimate}
  >
    <a
      href={url}
      target="_blank" rel="noopener noreferrer external"
      data-tip={name} data-for="PORTFOLIO__tooltip"
    >
      <i dangerouslySetInnerHTML={{ __html: icon }} />
    </a>
  </WebAnimation>
);

PortfolioPowerByItem.propTypes = {
  name: React.PropTypes.string,
  url: React.PropTypes.string,
  icon: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
  index: React.PropTypes.number,
};
PortfolioPowerByItem.defaultProps = {
  name: '',
  url: '',
  icon: '',
  shouldAnimate: false,
  index: 0,
};


export default PortfolioPowerByItem;
