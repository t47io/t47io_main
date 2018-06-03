import React from 'react';
import PropTypes from 'prop-types';

import Chart from './Chart.jsx';

import { getChartData } from '../util.js';
import {
  ADD_DEL_CHART_OPTIONS,
  COMMIT_CHART_OPTIONS,
} from '../constants/util.js';

/* eslint-disable */
import cssFeat from '../stylesheets/FeatureSection.scss';
import cssRepo from '../stylesheets/GitHubSection.scss';
/* eslint-enable */


const RepositoryCharts = ({
  additions,
  deletions,
  commits,
  months,
}) => {
  const {
    commitData,
    addDelData,
  } = getChartData(months, commits, additions, deletions);

  return (
    <div>
      <Chart
        styleName="cssFeat.PROJECT__thumbnail cssRepo.PROJECT__repo-chart"
        data={commitData}
        {...COMMIT_CHART_OPTIONS}
      />
      <Chart
        styleName="cssFeat.PROJECT__thumbnail cssRepo.PROJECT__repo-chart"
        data={addDelData}
        {...ADD_DEL_CHART_OPTIONS}
      />
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
