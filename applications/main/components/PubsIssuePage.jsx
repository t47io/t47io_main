import React from 'react';
import PropTypes from 'prop-types';


const PubsIssuePage = ({
  issue,
  page,
  isPreprint,
}) => {
  if (isPreprint) {
    return (
      <span className="PUBS__issue">
        , <span className="text-gray">{issue}</span>.
      </span>
    );
  }

  return (
    <span className="PUBS__issue">
      <b>{issue}</b>: {page}.
    </span>
  );
};

PubsIssuePage.propTypes = {
  issue: PropTypes.string,
  page: PropTypes.string,
  isPreprint: PropTypes.bool,
};
PubsIssuePage.defaultProps = {
  issue: '',
  page: '',
  isPreprint: false,
};


export default PubsIssuePage;
