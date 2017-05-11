import React from 'react';


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
  title: React.PropTypes.string,
  image: React.PropTypes.string,
};
TitleImage.defaultProps = {
  title: '',
  image: '',
};


export default TitleImage;
