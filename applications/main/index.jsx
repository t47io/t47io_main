import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import Main from './containers/index.jsx';
import reducer from './reducers/index.js';
import { LOAD_JSON_DATA } from './constants/actionTypes.js';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  // require('preact/devtools');

  const createLogger = require('redux-logger');
  const logger = createLogger();
  middleware.push(logger);
}
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

require.ensure([], (require) => {
  const json = require('../../config/main.json');
  store.dispatch({
    type: LOAD_JSON_DATA,
    payload: { ...json },
  });
}, 'config');


ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
