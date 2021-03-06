import React from 'react';
import PropTypes from 'prop-types';

import { MARKUP } from '../constants/util.js';
import { italicRegex } from '../util.js';

import '../stylesheets/PubsSection.scss';


const PubsTitle = ({ title }) => {
  const titleChunks = title.split(MARKUP);
  const italicChunks = title.match(italicRegex);

  if (italicChunks === null) {
    return (
      <b styleName="PUBS__title">{title}</b>
    );
  }

  return (
    <b styleName="PUBS__title">
      {titleChunks.map((chunk) => {
        if (italicChunks.includes(`${MARKUP}${chunk}${MARKUP}`)) {
          return (
            <i key={chunk}>{chunk}</i>
          );
        }
        return chunk;
      })}
    </b>
  );
};

PubsTitle.propTypes = {
  title: PropTypes.string,
};
PubsTitle.defaultProps = {
  title: '',
};


export default PubsTitle;
