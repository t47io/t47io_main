import React from 'react';


const GithubLegend = () => (
  <g transform="translate(12, 128)">
    <text y="8">
      # Includes contributions from
      <tspan style={{ fontStyle: 'italic' }}>
        {' private '}
      </tspan>
      repositories
    </text>
    <g transform="translate(555, 0)">
      {[...Array(5).keys()].map(i => (
        <rect
          className={`day day_${i}`}
          x={i * 13}
        />
      ))}

      <text x="-35" y="10" className="legend">Less</text>
      <text x="73" y="10" className="legend">More</text>
    </g>
  </g>
);


export default GithubLegend;
