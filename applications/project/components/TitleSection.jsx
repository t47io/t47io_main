import React from 'react';

import TitleImage from './TitleImage.jsx';


const TitleSection = ({
  title,
  description,
  image,
  isSplit,
  children,
}) => {
  const wrapperColumn = isSplit ? 6 : 12;

  return (
    <div className="row">
      <div className={`col-lg-${wrapperColumn} col-md-${wrapperColumn} col-sm-12 col-xs-12`}>
        <h1 className="text-center">{title}</h1>
        <p className="lead text-center">{description}</p>
        {isSplit ? children : (
          <TitleImage
            title={title}
            image={image}
          />
        )}
      </div>

      {isSplit && (
        <div className={`col-lg-${wrapperColumn} col-md-${wrapperColumn} col-sm-12 col-xs-12 text-center`}>
          <TitleImage
            title={title}
            image={image}
          />
        </div>
      )}
    </div>
  );
};

TitleSection.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.string,
  isSplit: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.node,
    React.PropTypes.arrayOf(React.PropTypes.node),
  ]),
};
TitleSection.defaultProps = {
  title: '',
  description: '',
  image: '',
  isSplit: false,
  children: null,
};


export default TitleSection;
