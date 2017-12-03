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
  const commitData = [];
  const addDelData = [];
  months.forEach((month, i) => {
    const date = month.split('/').reverse().map(num => parseInt(num, 10));
    commitData.push([
      new Date(date[0], date[1] - 1),
      commits[i],
    ]);
    addDelData.push([
      new Date(date[0], date[1] - 1),
      additions[i],
      -deletions[i],
    ]);
  });
  commitData.unshift(['month', 'commits']);
  addDelData.unshift(['month', 'additions', 'deletions']);

  return {
    commitData,
    addDelData,
  };
};
