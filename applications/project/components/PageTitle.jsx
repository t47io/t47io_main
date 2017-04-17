import React from 'react';


const PageTitle = ({
  title,
  description,
  image,
}) => (
  <div>
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
);

PageTitle.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.string,
};
PageTitle.defaultProps = {
  title: '',
  description: '',
  image: '',
};


export default PageTitle;
