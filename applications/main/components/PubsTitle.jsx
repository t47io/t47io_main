import React from 'react';


const PubsTitle = ({ title }) => {
  const titleChunks = title.split('_');
  const italicChunks = title.match(/_[a-zA-Z0-9]*_/g);

  if (italicChunks === null) {
    return (
      <b className="PUBS__title">{title}</b>
    );
  }

  return (
    <b className="PUBS__title">
      {
        titleChunks.map((chunk) => {
          if (italicChunks.indexOf(`_${chunk}_`) !== -1) {
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
