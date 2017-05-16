import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import home from './home.js';
import about from './about.js';
import affiliation from './affiliation.js';
import portfolio from './portfolio.js';
import skills from './skills.js';
import stats from './stats.js';
import pubs from './pubs.js';
import contact from './contact.js';

import navbar from '../../common/reducers/navbar.js';
import footer from '../../common/reducers/footer.js';

import { LOAD_JSON_DATA } from '../constants/actionTypes.js';
import { HOME } from '../constants/sectionTypes.js';


export const crossReducer = (state, { type, payload }) => {
  if (type !== LOAD_JSON_DATA) { return state; }

  const newState = { ...state };
  Object.keys(newState).forEach((key) => {
    newState[key].data = payload[key];
  });

  newState.home.data.loaded = true;
  newState.navbar.animations.activeSection = HOME;
  if (payload.server) {
    newState.home.data.server = true;
    newState.home.animations.ready = true;
    newState.home.animations.intro = true;
  }
  return newState;
};

const mainReducer = combineReducers({
  home,
  about,
  affiliation,
  portfolio,
  skills,
  stats,
  pubs,
  contact,

  navbar,
  footer,
});


export default reduceReducers(mainReducer, crossReducer);
