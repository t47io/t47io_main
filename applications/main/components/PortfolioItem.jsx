import React from 'react';
import {
  SparkScroll,
  SparkProxy,
} from '../../common/js/factory.js';

import { portfolio as tween } from '../js/tweens.js';


const PortfolioItem = ({
  name,
  category,
  description,
  title,
  url,
  index,
}) => (
  <SparkProxy.div
    className="col-xs-12 col-sm-6 col-md-4 col-lg-4 PORTFOLIO__entry"
    proxyId={`PORTFOLIO__proxy_${index}`}
  >
    <SparkScroll.div
      className="PORTFOLIO__item"
      proxy={`PORTFOLIO__proxy_${index}`}
      data-category={category}
      timeline={tween.thumbnail}
    >
      <div className="SPRITE">
        <div className={`SPRITE__portfolio-${name}`} />
      </div>
      <div className="PORTFOLIO__text">
        <a
          href={url || `/project/${name}`}
          target="_blank" rel="noopener noreferrer"
        >
          {title}
          <i className="fa fa-fw fa-md fa-link-ext" />
        </a>
        <span dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </SparkScroll.div>
  </SparkProxy.div>
);

PortfolioItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string,
  index: React.PropTypes.number.isRequired,
};


export default PortfolioItem;
