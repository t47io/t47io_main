import React from 'react';


const TitleImage = ({
  title,
  image,
}) => (
  <p className="thumbnail text-center">
    <a
      href={image}
      target="_blank" rel="noopener noreferrer"
    >
      <img
        src={image}
        alt={title}
        style={{ maxWidth: '100%' }}
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
