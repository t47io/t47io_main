import React from 'react';
import PropTypes from 'prop-types';

import {
  MARKUP,
  FIELD_MARKUP,
} from '../constants/util.js';
import { fieldRegex } from '../util.js';


const PortfolioDescription = ({ description }) => {
  const despChunks = description.split(MARKUP);
  const replaceChunks = description.match(fieldRegex);

  if (replaceChunks === null) {
    return (
      <span className="PORTFILIO__text-description">{description}</span>
    );
  }

  return (
    <span className="PORTFILIO__text-description">
      {despChunks.map((chunk) => {
        if (`${MARKUP}${chunk}${MARKUP}` === FIELD_MARKUP) {
          return (
            <u key={chunk}>
              <b>1<sup>st</sup></b>
            </u>
          );
        }
        return chunk;
      })}
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
