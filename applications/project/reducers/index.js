import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import data from './data.js';
import project from './project.js';
import repository from './repository.js';

import navbar from './navbar.js';
import footer from './footer.js';

import { LOAD_JSON_DATA } from '../constants/actionTypes.js';


export const crossReducer = (state, { type, payload }) => {
  if (type !== LOAD_JSON_DATA) { return state; }

  return {
    ...state,
    ...payload,
  };
};

const mainReducer = combineReducers({
  data,
  project,
  repository,

  navbar,
  footer,
});


export default reduceReducers(mainReducer, crossReducer);
