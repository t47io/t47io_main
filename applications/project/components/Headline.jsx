import React from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/TitleSection.scss';


const Headline = ({
  title,
  icon,
}) => (
  <h2 styleName="PROJECT__headline" className="text-center">
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
