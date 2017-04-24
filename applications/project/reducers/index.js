import { combineReducers } from 'redux';

import data from './data.js';
import project from './project.js';
import repository from './repository.js';

import navbar from './navbar.js';
import footer from './footer.js';


const reducer = combineReducers({
  data,
  project,
  repository,

  navbar,
  footer,
});


export default reducer;
