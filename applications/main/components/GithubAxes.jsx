import React from 'react';
import PropTypes from 'prop-types';


const GithubAxes = ({
  monthText,
  weekdayText,
}) => (
  <g transform="translate(24, 10)">
    <g transform="translate(4, 32)">
      {weekdayText.map((wday, i) => (
        <text
          key={`axes-${wday}`}
          className="wday"
          textAnchor="end"
          y={i * 24}
        >
          {wday}
        </text>
      ))}
    </g>
    <g>
      {Object.keys(monthText).map(month => (
        <text
          key={`axes-${month}`}
          className="month"
          x={monthText[month]}
        >
          {month}
        </text>
      ))}
    </g>
  </g>
);

GithubAxes.propTypes = {
  monthText: PropTypes.object,
  weekdayText: PropTypes.arrayOf(PropTypes.string),
};
GithubAxes.defaultProps = {
  monthText: {},
  weekdayText: [],
};


export default GithubAxes;
