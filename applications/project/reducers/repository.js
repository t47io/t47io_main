import { REPOSITORY_LIST } from '../constants/repositoryTypes.js';


const initialState = Object.keys(REPOSITORY_LIST).map(repo => ({
  [repo]: {},
}))
.reduce((obj, item) => ({
  ...obj,
  ...item,
}), {});

const repositoryReducer = (state = initialState, { type }) => {
  switch (type) {
    default: {
      return state;
    }
  }
};


export default repositoryReducer;
