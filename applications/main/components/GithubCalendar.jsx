import React from 'react';

import GithubAxes from './GithubAxes.jsx';
import GithubColumn from './GithubColumn.jsx';
import GithubLegend from './GithubLegend.jsx';

import {
  DAY_MILLISECONDS,
  WEEK_DAYS,
} from '../../common/constants/util.js';


const GithubCalendar = ({
  height,
  width,
  countArray,
  indexArray,
  startDate,
  monthText,
}) => {
  const firstDate = (new Date(startDate)).getTime();

  return (
    <svg
      height={height}
      width={width}
    >
      {[...Array(Math.ceil(countArray.length / 7)).keys()].map(i => (
        <GithubColumn
          dx={(i + 3) * 12}
          dy={20}
          countArray={countArray.slice(i * 7, Math.min((i + 1) * 7, countArray.length))}
          indexArray={indexArray.slice(i * 7, Math.min((i + 1) * 7, indexArray.length))}
          startDate={firstDate + i * 7 * DAY_MILLISECONDS}
        />
      ))}

      <GithubAxes
        monthText={monthText}
        weekdayText={WEEK_DAYS.filter((day, i) => (i % 2))}
      />
      <GithubLegend />
    </svg>
  );
};

GithubCalendar.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  countArray: React.PropTypes.arrayOf(React.PropTypes.number),
  indexArray: React.PropTypes.arrayOf(React.PropTypes.number),
  startDate: React.PropTypes.string,
  monthText: React.PropTypes.object,
};
GithubCalendar.defaultProps = {
  height: 145,
  width: 675,
  countArray: [],
  indexArray: [],
  startDate: '1970-01-01',
  monthText: {},
};


export default GithubCalendar;
