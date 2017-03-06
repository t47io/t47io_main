import React from 'react';


const AffiliationRole = ({
  title,
  position,
  team,
}) => (
  <p>
    <b>{position}</b>
    {` ${title}`}
    <br className="hidden-lg hidden-md" />
    <span className="text-green">{' @ '}</span>
    <u>{team}</u>
  </p>
);

AffiliationRole.propTypes = {
  title: React.PropTypes.string.isRequired,
  position: React.PropTypes.string.isRequired,
  team: React.PropTypes.string.isRequired,
};


export default AffiliationRole;
