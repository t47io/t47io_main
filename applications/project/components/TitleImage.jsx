import React from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/TitleSection.scss';


const TitleImage = ({
  title,
  image,
}) => (
  <p styleName="PROJECT__title" className="thumbnail text-center">
    <a
      href={image}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        styleName="PROJECT__title-image"
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
