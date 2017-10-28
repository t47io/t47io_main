import React from 'react';
import PropTypes from 'prop-types';


const ITALIC_MARKUP = '_';
const italicRegex = new RegExp(`${ITALIC_MARKUP}[a-zA-Z0-9]*${ITALIC_MARKUP}`, 'g');


const PubsTitle = ({ title }) => {
  const titleChunks = title.split(ITALIC_MARKUP);
  const italicChunks = title.match(italicRegex);

  if (italicChunks === null) {
    return (
      <b className="PUBS__title">{title}</b>
    );
  }

  return (
    <b className="PUBS__title">
      {titleChunks.map((chunk) => {
        if (italicChunks.includes(`${ITALIC_MARKUP}${chunk}${ITALIC_MARKUP}`)) {
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
