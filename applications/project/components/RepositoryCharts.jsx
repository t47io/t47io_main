import React from 'react';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';

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
      <div className="PROJECT__thumbnail">
        <Chart
          chartType="AreaChart"
          data={commitData}
          options={COMMIT_CHART_OPTIONS}
          width="100%"
          height="175px"
          loader={<span />}
        />
      </div>
      <div className="PROJECT__thumbnail">
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
  additions: PropTypes.arrayOf(PropTypes.number),
  deletions: PropTypes.arrayOf(PropTypes.number),
  commits: PropTypes.arrayOf(PropTypes.number),
  months: PropTypes.arrayOf(PropTypes.string),
};
RepositoryCharts.defaultProps = {
  additions: [],
  deletions: [],
  commits: [],
  months: [],
};


export default RepositoryCharts;
