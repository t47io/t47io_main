import React from 'react';

import Animation from '../../common/components/Animation.jsx';


const PortfolioItem = ({
  name,
  description,
  title,
  url,
  shouldAnimate,
}) => (
  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 PORTFOLIO__entry">
    <Animation
      className="PORTFOLIO__item"
      shouldAnimate={shouldAnimate}
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
    </Animation>
  </div>
);

PortfolioItem.propTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  title: React.PropTypes.string,
  url: React.PropTypes.string,
  shouldAnimate: React.PropTypes.bool,
};
PortfolioItem.defaultProps = {
  name: '',
  description: '',
  title: '',
  url: '',
  shouldAnimate: true,
};


export default PortfolioItem;
