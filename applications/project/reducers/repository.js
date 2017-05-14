import { LOAD_REPOSITORY_JSON_DATA } from '../constants/actionTypes.js';
import { REPOSITORY_LIST } from '../constants/repositoryTypes.js';


const initialState = REPOSITORY_LIST.map(repo => ({
  [repo]: {},
}))
.reduce((obj, item) => ({
  ...obj,
  ...item,
}), {});

const repositoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_REPOSITORY_JSON_DATA: {
      return payload;
    }
    default: {
      return state;
    }
  }
};


export default repositoryReducer;
