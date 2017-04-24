import {
  TOGGLE_PAGE_READY,
  LOAD_PROJECT_JSON_DATA,
  LOAD_REPOSITORY_JSON_DATA,
} from '../constants/actionTypes.js';


const initialState = {
  project: false,
  repository: false,
  ready: false,
};

const dataReducer = (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_PAGE_READY:
      return {
        ...state,
        ready: true,
      };
    case LOAD_PROJECT_JSON_DATA:
      return {
        ...state,
        project: true,
      };
    case LOAD_REPOSITORY_JSON_DATA:
      return {
        ...state,
        repository: true,
      };

    default:
      return state;
  }
};


export default dataReducer;
