import React from 'react';


const TitleSection = ({
  title,
  description,
  image,
}) => (
  <div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      <p className="thumbnail">
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
      <hr />
    </div>
  </div>
);

TitleSection.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.string,
};
TitleSection.defaultProps = {
  title: '',
  description: '',
  image: '',
};


export default TitleSection;
