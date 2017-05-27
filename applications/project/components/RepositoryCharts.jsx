import React from 'react';
import { Chart } from 'react-google-charts';

import { getChartData } from '../util.js';
import {
  ADD_DEL_CHART_OPTIONS,
  COMMIT_CHART_OPTIONS,
} from '../constants/util.js';


const RepositoryCharts = ({
  additions,
  deletions,
  commits,
  months,
}) => {
  const { commitData, addDelData } = getChartData(months, commits, additions, deletions);

  return (
    <div>
      <div className="thumbnail">
        <Chart
          chartType="AreaChart"
          data={commitData}
          options={COMMIT_CHART_OPTIONS}
          width="100%"
          height="175px"
          loader={<span />}
        />
      </div>
      <div className="thumbnail">
        <Chart
          chartType="AreaChart"
          data={addDelData}
          options={ADD_DEL_CHART_OPTIONS}
          width="100%"
          height="175px"
          loader={<span />}
        />
      </div>
    </div>
  );
};

RepositoryCharts.propTypes = {
  additions: React.PropTypes.arrayOf(React.PropTypes.number),
  deletions: React.PropTypes.arrayOf(React.PropTypes.number),
  commits: React.PropTypes.arrayOf(React.PropTypes.number),
  months: React.PropTypes.arrayOf(React.PropTypes.string),
};
RepositoryCharts.defaultProps = {
  additions: [],
  deletions: [],
  commits: [],
  months: [],
};


export default RepositoryCharts;
