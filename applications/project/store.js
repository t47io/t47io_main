import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers/index.js';
import { LOAD_JSON_DATA } from './constants/actionTypes.js';


const middleware = [
  thunk,
  (typeof logger === 'function') ? logger : null,
].filter(Boolean);
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

if (process.env.NODE_ENV !== 'production') {
  require.ensure([], (require) => {
    const json = require('../../config/project.json');
    store.dispatch({
      type: LOAD_JSON_DATA,
      payload: { ...json },
    });
  }, 'data');
} else {
  require.ensure([], (require) => {
    const json = require('../../config/project.json');
    store.dispatch({
      type: LOAD_JSON_DATA,
      payload: { ...json },
    });
  }, 'd');
}


export default store;
