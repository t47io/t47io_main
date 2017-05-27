import React from 'react';
// import {
//   VictoryArea,
//   VictoryAxis,
//   VictoryChart,
// } from 'victory';

import Headline from './Headline.jsx';
import Repository from './Repository.jsx';


const GithubSection = ({ repos }) => (
  <div className="row">
    <hr />
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
      <Headline
        title="Repository"
        icon="fork"
      />
      {repos.map(repo => (
        <Repository
          {...repo}
          key={repo.basics.name}
        />
      ))}
      {/*
      <VictoryChart>
        <VictoryAxis
          dependentAxis
          tickCount={3}
          tickFormat={(tick) => tick.toPrecision(2)}
        />
        <VictoryArea
          data={[
            {month: "September", profit: 35000, loss: 2000},
            {month: "October", profit: 42000, loss: 8000},
            {month: "November", profit: 55000, loss: 5000}
          ]}
          x="month"
          y={(datum) => datum.profit - datum.loss}
        />
      </VictoryChart>
      */}
    </div>
  </div>

);

GithubSection.propTypes = {
  repos: React.PropTypes.arrayOf(React.PropTypes.object),
};
GithubSection.defaultProps = {
  repos: [],
};


export default GithubSection;
