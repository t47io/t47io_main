export const getColumn = condition => (condition ? 6 : 12);

export const getPageProps = (state, project) => {
  if (!state.project || !state.repository) { return {}; }

  const projectData = state.project[project];
  const { repos = [] } = projectData;

  const repositoryData = Object.keys(state.repository)
    .filter(key => repos.includes(key))
    .map(key => ({
      ...state.repository[key],
      key,
    }));

  return {
    ...projectData,
    repos: repositoryData,
  };
};

export const getChartData = (months, commits, additions, deletions) => {
  const labels = months.map((month) => {
    const date = month.split('/').reverse().map(num => parseInt(num, 10));
    return new Date(date[0], date[1] - 1)
    .toLocaleString('en-us', {
      month: 'short',
      year: 'numeric',
    });
  });

  return {
    commitData: {
      labels,
      datasets: [{
        name: 'Commits',
        values: commits,
      }],
    },
    addDelData: {
      labels,
      datasets: [{
        name: 'Additions',
        values: additions.map(d => (d ? Math.log10(d) : 0)),
      }, {
        name: 'Deletions',
        values: deletions.map(d => (d ? -Math.log10(d) : 0)),
      }],
    },
  };
};
