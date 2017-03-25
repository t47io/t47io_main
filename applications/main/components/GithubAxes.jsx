import React from 'react';


const GithubAxes = ({
  monthText,
  weekdayText,
}) => (
  <g transform="translate(24, 10)">
    <g transform="translate(4, 32)">
      {weekdayText.map((wday, i) => (
        <text
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
  monthText: React.PropTypes.object,
  weekdayText: React.PropTypes.arrayOf(React.PropTypes.string),
};
GithubAxes.defaultProps = {
  monthText: {},
  weekdayText: [],
};


export default GithubAxes;
