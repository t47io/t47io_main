import React from 'react';


const SectionTitle = ({
  title,
  icon,
}) => (
  <h2 className="text-center">
    <i className={`fa fa-fw fa-${icon}`} />
    {title}
  </h2>
);

SectionTitle.propTypes = {
  title: React.PropTypes.string,
  icon: React.PropTypes.string,
};
SectionTitle.defaultProps = {
  title: '',
  icon: '',
};


export default SectionTitle;
