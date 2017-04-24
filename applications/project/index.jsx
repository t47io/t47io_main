import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import Project from './containers/index.jsx';
import reducer from './reducers/index.js';
import {
  LOAD_PROJECT_JSON_DATA,
  LOAD_REPOSITORY_JSON_DATA,
} from './constants/actionTypes.js';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  // require('preact/devtools');

  const { logger } = require('redux-logger');
  middleware.push(logger);
}
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);


require.ensure([], (require) => {
  const json = require('../../config/project.json');
  store.dispatch({
    type: LOAD_PROJECT_JSON_DATA,
    payload: { ...json },
  });
}, 'data');
require.ensure([], (require) => {
  const json = require('../../config/repository.json');
  store.dispatch({
    type: LOAD_REPOSITORY_JSON_DATA,
    payload: { ...json },
  });
}, 'repo');


ReactDOM.render(
  <Provider store={store}>
    <Project />
  </Provider>,
  document.getElementById('app')
);
