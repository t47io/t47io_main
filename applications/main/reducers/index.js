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

import { LOAD_JSON_DATA } from '../constants/actionTypes.js';


const crossReducer = (state, action) => {
  if (action.type !== LOAD_JSON_DATA) { return state; }
  const newState = { ...state };
  Object.keys(newState).forEach((key) => {
    newState[key].data = action.payload[key];
  });

  newState.about.animations.icon = newState.about.data.items.length;
  newState.portfolio.animations.filter = newState.portfolio.data.categories.length;
  newState.portfolio.animations.thumbnail = newState.portfolio.data.items.length;
  newState.skills.animations.left = newState.skills.data.lens.left;
  newState.skills.animations.right = newState.skills.data.lens.right;
  newState.pubs.animations.entry = newState.pubs.data.lens;
  newState.contact.animations.icon = newState.contact.data.items.length;
  newState.contact.animations.left = newState.contact.data.lens.left;
  newState.contact.animations.right = newState.contact.data.lens.right;

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
});


export default reduceReducers(mainReducer, crossReducer);
