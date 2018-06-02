import React from 'react';
import PropTypes from 'prop-types';

import { AUTHOR_NAME } from '../constants/util.js';

import '../../common/mixins/typography.scss';


const PubsAuthor = ({ authors }) => {
  const numAuthors = authors.length;

  return (
    <span>
      {authors.map((author, i) => {
        let displayAuthor = author.split(' ').join(', ');
        if (i <= numAuthors - 2) {
          displayAuthor += ', ';
        } else if (i === numAuthors - 1) {
          displayAuthor = `and ${displayAuthor}`;
        }
        if (author.startsWith(AUTHOR_NAME)) {
          return (
            <span key={author}>
              <u styleName="text-black bg-gray-light">
                Tian, S.
                {author.endsWith('*') && '*'}
                {(i <= numAuthors - 2) && ','}
              </u>
              {' '}
            </span>
          );
        }
        return displayAuthor;
      })}
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
