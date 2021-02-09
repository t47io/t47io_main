import { REPOSITORY_LIST } from '../constants/repositoryTypes.js';


const initialState = Object.fromEntries(Object.keys(REPOSITORY_LIST).map(repo => ([repo, {}])));
const repositoryReducer = (state = initialState, { type }) => {
  switch (type) {
    default: {
      return state;
    }
  }
};


export default repositoryReducer;
