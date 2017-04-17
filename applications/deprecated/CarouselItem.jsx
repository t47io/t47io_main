import React from 'react';


const CarouselItem = ({
  tooltip,
  spriteName,
  isActive,
}) => {
  const activeClassName = isActive ? 'active' : '';

  return (
    <div className="thumbnail PROJECT__thumbnail SPRITE__carousel">
      <div
        className={`PROJECT__carousel-item ${spriteName} ${activeClassName}`}
        data-tip={tooltip}
        data-for="PROJECT__tooltip"
      />
    </div>
  );
};

CarouselItem.propTypes = {
  tooltip: React.PropTypes.string,
  spriteName: React.PropTypes.string,
  isActive: React.PropTypes.bool,
};
CarouselItem.defaultProps = {
  tooltip: '',
  spriteName: '',
  isActive: false,
};


export default CarouselItem;
