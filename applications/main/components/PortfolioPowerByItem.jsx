import React from 'react';


const PortfolioPowerByItem = ({
  name,
  url,
  icon,
}) => (
  <a
    href={url}
    target="_blank" rel="noopener noreferrer external"
    data-tip={name} data-for="PORTFOLIO__tooltip"
  >
    <i dangerouslySetInnerHTML={{ __html: icon }} />
  </a>
);

PortfolioPowerByItem.propTypes = {
  name: React.PropTypes.string,
  url: React.PropTypes.string,
  icon: React.PropTypes.string,
};
PortfolioPowerByItem.defaultProps = {
  name: '',
  url: '',
  icon: '',
};


export default PortfolioPowerByItem;
