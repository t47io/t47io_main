import React from 'react';

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
        y={i * 12}
        day={indexArray[i]}
        count={count}
        date={startDate + i * DAY_MILLISECONDS}
      />
    ))}
  </g>
);

GithubColumn.propTypes = {
  dx: React.PropTypes.number,
  dy: React.PropTypes.number,
  countArray: React.PropTypes.arrayOf(React.PropTypes.number),
  indexArray: React.PropTypes.arrayOf(React.PropTypes.number),
  startDate: React.PropTypes.number,
};
GithubColumn.defaultProps = {
  dx: 0,
  dy: 0,
  countArray: [],
  indexArray: [],
  startDate: 0,
};


export default GithubColumn;
