import React from 'react';


const GithubRect = ({
  x,
  y,
  day,
  count,
  date,
}) => {
  if (new Date(date) > new Date()) { return null; }

  const dateString = new Date(date).toISOString().slice(0, 10);
  const tooltip = !count ? {} : {
    'data-tip': `${count} contribution${count > 1 && 's'} on ${dateString}`,
    'data-for': 'STATS__tooltip',
  };

  return (
    <rect
      className={`day day_${day}`}
      x={x}
      y={y}
      height="11"
      width="11"
      {...tooltip}
    />
  );
};

GithubRect.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  day: React.PropTypes.number,
  count: React.PropTypes.number,
  date: React.PropTypes.number,
};
GithubRect.defaultProps = {
  x: 0,
  y: 0,
  day: 0,
  count: 0,
  date: 0,
};


export default GithubRect;
