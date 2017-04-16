import React from 'react';


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
  issue: React.PropTypes.string,
  page: React.PropTypes.string,
  isPreprint: React.PropTypes.bool,
};
PubsIssuePage.defaultProps = {
  issue: '',
  page: '',
  isPreprint: false,
};


export default PubsIssuePage;
