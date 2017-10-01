import React from 'react';
import PropTypes from 'prop-types';


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
  title: PropTypes.string,
  icon: PropTypes.string,
};
Headline.defaultProps = {
  title: '',
  icon: '',
};


export default Headline;
