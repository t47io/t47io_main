import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Project from './containers/index.jsx';
import store from './store.js';


ReactDOM.render(
  <Provider store={store}>
    <Project />
  </Provider>,
  document.getElementById('app')
);
