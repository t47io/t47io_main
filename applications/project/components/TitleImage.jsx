import React from 'react';
import PropTypes from 'prop-types';


const TitleImage = ({
  title,
  image,
}) => (
  <p className="PROJECT__title thumbnail text-center">
    <a
      href={image}
      target="_blank" rel="noopener noreferrer"
    >
      <img
        className="PROJECT__title-image"
        alt={title}
        src={image}
      />
    </a>
  </p>
);

TitleImage.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};
TitleImage.defaultProps = {
  title: '',
  image: '',
};


export default TitleImage;
