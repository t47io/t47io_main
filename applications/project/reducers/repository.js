import { REPOSITORY_INTERNAL_NAMES } from '../constants/repositoryTypes.js';


const initialState = REPOSITORY_INTERNAL_NAMES.map(repo => ({
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
