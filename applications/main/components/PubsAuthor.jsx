import React from 'react';
import PropTypes from 'prop-types';


const PubsAuthor = ({ authors }) => {
  const numAuthors = authors.length;

  return (
    <span>
      {
        authors.map((author, i) => {
          let displayAuthor = author.split(' ').join(', ');
          if (i <= numAuthors - 2) {
            displayAuthor += ', ';
          } else if (i === numAuthors - 1) {
            displayAuthor = `and ${displayAuthor}`;
          }
          if (author === 'Tian S.') {
            return (
              <span>
                <u className="text-black bg-gray-light">
                  Tian, S.
                  {(i <= numAuthors - 2) && ','}
                </u>
                {' '}
              </span>
            );
          }
          return displayAuthor;
        })
      }
    </span>
  );
};

PubsAuthor.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
};
PubsAuthor.defaultProps = {
  authors: [],
};


export default PubsAuthor;
