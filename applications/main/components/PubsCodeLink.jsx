import React from 'react';


const PubsCodeLink = ({ code }) => {
  if (!code) { return null; }

  return (
    <a href={code} target="_blank" rel="noopener noreferrer external" className="text-dark-green bg-light-green">
      <i className="fa fa-fwn fa-file-code" />
    </a>
  );
};

PubsCodeLink.propTypes = {
  code: React.PropTypes.string,
};


export default PubsCodeLink;
