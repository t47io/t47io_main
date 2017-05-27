const getPageProps = (state, project) => {
  if (!state.project || !state.repository) { return {}; }

  const repositoryData = state.repository;
  const projectData = state.project[project];
  const { repos = [] } = projectData;

  return {
    ...projectData,
    data: (
      Object.keys(repositoryData)
      .filter(key => repos.includes(key))
      .map(key => ({
        key: repositoryData[key],
      }))
      .reduce((obj, item) => ({
        ...obj,
        ...item,
      }), {})
    ),
  };
};


export default getPageProps;
