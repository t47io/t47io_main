import React from 'react';


const AffiliationRole = ({
  title,
  position,
  team,
}) => (
  <p className="AFFILIATION__role">
    <b>{position}</b>
    {` ${title}`}
    <br className="hidden-lg hidden-md" />
    <span className="text-main">{' @ '}</span>
    <u>{team}</u>
  </p>
);

AffiliationRole.propTypes = {
  title: React.PropTypes.string,
  position: React.PropTypes.string,
  team: React.PropTypes.string,
};
AffiliationRole.defaultProps = {
  title: '',
  position: '',
  team: '',
};


export default AffiliationRole;
