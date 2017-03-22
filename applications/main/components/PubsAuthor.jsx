import React from 'react';


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
                <u className="text-main bg-light-gray">
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
  authors: React.PropTypes.arrayOf(React.PropTypes.string),
};
PubsAuthor.defaultProps = {
  authors: [],
};


export default PubsAuthor;
