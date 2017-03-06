import React from 'react';


const PubsCiteElement = ({ citation }) => {
  if (!citation) { return null; }

  return (
    <span className="PUBS__cite pull-right text-gray bg-light-gray">
      <i className="fa fa-fw fa-balance-scale" />
      <i>
        <small>Cited by :</small>
      </i>
      <u className="text-main" style={{ paddingLeft: '0.5em' }}>{citation}</u>
    </span>
  );
};

PubsCiteElement.propTypes = {
  citation: React.PropTypes.number,
};


export default PubsCiteElement;
