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
