import React from 'react';
import ReactTooltip from 'react-tooltip';

import { svgBrands } from './Images.js';
import PortfolioPowerByItem from './PortfolioPowerByItem.jsx';

import {
  LICENSE,
  REPOSITORY,
} from '../../config.js';

const tooltipOffset = {
  right: 25,
  bottom: 15,
};


const PortfolioPowerBy = ({ items }) => (
  <div className="row">
    <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
    <div className="col-lg-10 col-md-10 col-sm-8 col-xs-8">
      <div className="PORTFOLIO__power-by">
        <h5 className="PORTFOLIO__find-more text-gray text-center">
          This site is (proudly) powered by:
        </h5>
        <p className="PORTFOLIO__brand-logo text-center">
          {items.map(item => (
            <PortfolioPowerByItem
              {...item}
              icon={svgBrands[item.name]}
              key={`PORTFOLIO__brand-logo-${item.name}`}
            />
          ))}
        </p>
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
    </div>
    <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2" />
  </div>
);

PortfolioPowerBy.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string,
    icon: React.PropTypes.string,
  })),
};
PortfolioPowerBy.defaultProps = {
  items: [],
};


export default PortfolioPowerBy;
