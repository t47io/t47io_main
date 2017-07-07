import React from 'react';
import ReactTooltip from 'react-tooltip';

import { svgBrands } from './Images.js';
import PortfolioPowerByItem from './PortfolioPowerByItem.jsx';

import {
  LICENSE,
  REPOSITORY,
} from '../../config.js';

const tooltipOffset = {
  right: 20,
  bottom: 15,
};


const PortfolioPowerBy = ({
  items,
  shouldAnimate,
}) => (
  <div className="PORTFOLIO__power-by">
    <h5 className="PORTFOLIO__find-more text-gray text-center">
      <span className="fa-stack">
        <i className="fa fa-fw fa-blank fa-stack-2x text-main-light" />
        <i className="fa fa-fw fa-coffee fa-stack-1x text-white" />
      </span>
      This site is
      <i> (proudly) </i>
      <b className="text-black">Powered By</b>
    </h5>

    <ul className="PORTFOLIO__brands text-center">
      {items.map((item, i) => (
        <PortfolioPowerByItem
          key={`PORTFOLIO__brand-${item.name}`}
          {...item}
          icon={svgBrands[item.name]}
          shouldAnimate={shouldAnimate}
          index={i}
        />
      ))}
    </ul>

    <p className="PORTFOLIO__find-more text-center">
      <a
        href={REPOSITORY}
        target="_blank" rel="noopener noreferrer external"
      >
        Code and content
        <i className="fa fa-fw fa-sm fa-link-ext" />
      </a>
      on this site is licensed under
      <a
        href={LICENSE}
        target="_blank" rel="noopener noreferrer external"
      >
        <i className="fa fa-fw fa-creative-commons" />
        BY-NC-SA 4.0
        <i className="fa fa-fw fa-sm fa-link-ext" />
      </a>.
    </p>

    <ReactTooltip
      id="PORTFOLIO__tooltip"
      effect="solid" place="bottom" offset={tooltipOffset}
      insecure={false}
    />
  </div>
);

PortfolioPowerBy.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    icon: React.PropTypes.string,
  })),
  shouldAnimate: React.PropTypes.bool,
};
PortfolioPowerBy.defaultProps = {
  items: [],
  shouldAnimate: false,
};


export default PortfolioPowerBy;
