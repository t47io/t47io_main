import React from 'react';


const SPACER_MARKUP = '_';
const FIELD_MARKUP = `${SPACER_MARKUP}1st${SPACER_MARKUP}`;
const fieldRegex = new RegExp(FIELD_MARKUP, 'g');


const PortfolioDescription = ({ description }) => {
  const despChunks = description.split(SPACER_MARKUP);
  const replaceChunks = description.match(fieldRegex);

  if (replaceChunks === null) {
    return (
      <span>{description}</span>
    );
  }

  return (
    <span>
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
  description: React.PropTypes.string,
};
PortfolioDescription.defaultProps = {
  description: '',
};


export default PortfolioDescription;
