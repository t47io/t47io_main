import React from 'react';
import PropTypes from 'prop-types';


const PubsCiteElement = ({ citation }) => {
  if (!citation) { return null; }

  return (
    <span className="PUBS__cite pull-right text-gray bg-gray-light">
      <i className="fa fa-fw fa-balance-scale" />
      <i>
        <small>Cited by :</small>
      </i>
      <u className="text-black">{citation}</u>
    </span>
  );
};

PubsCiteElement.propTypes = {
  citation: PropTypes.number,
};
PubsCiteElement.defaultProps = {
  citation: NaN,
};


export default PubsCiteElement;
