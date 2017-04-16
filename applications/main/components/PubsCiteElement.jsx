import React from 'react';


const PubsCiteElement = ({ citation }) => {
  if (!citation) { return null; }

  return (
    <span className="PUBS__cite pull-right text-gray bg-light-gray">
      <i className="fa fa-fw fa-balance-scale" />
      <i>
        <small>Cited by :</small>
      </i>
      <u className="text-main">{citation}</u>
    </span>
  );
};

PubsCiteElement.propTypes = {
  citation: React.PropTypes.number,
};
PubsCiteElement.defaultProps = {
  citation: NaN,
};


export default PubsCiteElement;
