import React from 'react';

import { AVATAR_INDICES } from '../constants/util.js';


const GithubLegend = () => (
  <g transform="translate(12, 128)">
    <text y="8">
      # Includes contributions from
      <tspan className="private"> private </tspan>
      sources
    </text>
    <g transform="translate(555, 0)">
      {AVATAR_INDICES.map(i => (
        <rect
          key={`legend-${i}`}
          className={`day day_${i}`}
          x={i * 13}
          height="11"
          width="11"
        />
      ))}

      <text x="-35" y="10" className="legend">Less</text>
      <text x="73" y="10" className="legend">More</text>
    </g>
  </g>
);


export default GithubLegend;
