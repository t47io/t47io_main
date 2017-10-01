import React from 'react';
import PropTypes from 'prop-types';


const AffiliationRole = ({
  title,
  position,
  team,
}) => (
  <p className="AFFILIATION__role">
    <b>{position}</b>
    <span> {title}</span>
    <br className="hidden-lg hidden-md" />
    <span className="text-main"> @ </span>
    <u>{team}</u>
  </p>
);

AffiliationRole.propTypes = {
  title: PropTypes.string,
  position: PropTypes.string,
  team: PropTypes.string,
};
AffiliationRole.defaultProps = {
  title: '',
  position: '',
  team: '',
};


export default AffiliationRole;
