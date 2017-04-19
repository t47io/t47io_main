import React from 'react';


const Headline = ({
  title,
  icon,
}) => (
  <h2 className="PROJECT__headline text-center">
    <i className={`fa fa-fw fa-${icon}`} />
    {title}
  </h2>
);

Headline.propTypes = {
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
};
Headline.defaultProps = {
  title: '',
  icon: '',
};


export default Headline;
