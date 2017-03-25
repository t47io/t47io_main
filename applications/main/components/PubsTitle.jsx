import React from 'react';


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
      {
        titleChunks.map((chunk) => {
          if (italicChunks.indexOf(`${ITALIC_MARKUP}${chunk}${ITALIC_MARKUP}`) !== -1) {
            return (
              <i>{chunk}</i>
            );
          }
          return chunk;
        })
      }
    </b>
  );
};

PubsTitle.propTypes = {
  title: React.PropTypes.string,
};
PubsTitle.defaultProps = {
  title: '',
};


export default PubsTitle;
