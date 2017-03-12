import React from 'react';


const PubsIssuePage = ({
  issue,
  page,
  isPreprint,
}) => {
  if (isPreprint) {
    return (
      <span style={{ marginLeft: '0.5em' }}>
        , <span className="text-gray">{issue}</span>.
      </span>
    );
  }

  return (
    <span style={{ marginLeft: '0.5em' }}>
      <b>{issue}</b>: {page}.
    </span>
  );
};

PubsIssuePage.propTypes = {
  issue: React.PropTypes.string,
  page: React.PropTypes.string,
  isPreprint: React.PropTypes.bool,
};


export default PubsIssuePage;
