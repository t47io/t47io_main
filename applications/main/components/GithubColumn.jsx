import React from 'react';
import PropTypes from 'prop-types';

import GithubRect from './GithubRect.jsx';

import { DAY_MILLISECONDS } from '../../common/constants/util.js';


const GithubColumn = ({
  dx,
  dy,
  countArray,
  indexArray,
  startDate,
}) => (
  <g transform={`translate(${dx}, ${dy})`}>
    {countArray.map((count, i) => (
      <GithubRect
        key={`rect-${dx}-${i}`}
        y={i * 12}
        day={indexArray[i]}
        count={count}
        date={startDate + i * DAY_MILLISECONDS}
      />
    ))}
  </g>
);

GithubColumn.propTypes = {
  dx: PropTypes.number,
  dy: PropTypes.number,
  countArray: PropTypes.arrayOf(PropTypes.number),
  indexArray: PropTypes.arrayOf(PropTypes.number),
  startDate: PropTypes.number,
};
GithubColumn.defaultProps = {
  dx: 0,
  dy: 0,
  countArray: [],
  indexArray: [],
  startDate: 0,
};


export default GithubColumn;
