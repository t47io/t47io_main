import React from 'react';
import PropTypes from 'prop-types';


const SPACER_MARKUP = '_';
const FIELD_MARKUP = `${SPACER_MARKUP}1st${SPACER_MARKUP}`;
const fieldRegex = new RegExp(FIELD_MARKUP, 'g');


const PortfolioDescription = ({ description }) => {
  const despChunks = description.split(SPACER_MARKUP);
  const replaceChunks = description.match(fieldRegex);

  if (replaceChunks === null) {
    return (
      <span className="PORTFILIO__text-description">{description}</span>
    );
  }

  return (
    <span className="PORTFILIO__text-description">
      {
        despChunks.map((chunk) => {
          if (`${SPACER_MARKUP}${chunk}${SPACER_MARKUP}` === FIELD_MARKUP) {
            return (
              <u><b>1<sup>st</sup></b></u>
            );
          }
          return chunk;
        })
      }
    </span>
  );
};

PortfolioDescription.propTypes = {
  description: PropTypes.string,
};
PortfolioDescription.defaultProps = {
  description: '',
};


export default PortfolioDescription;
