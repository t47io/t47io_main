import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Main from '../../applications/main/containers/index.jsx';
import reducer, { crossReducer } from '../../applications/main/reducers/index.js';
import { LOAD_JSON_DATA } from '../../applications/main/constants/actionTypes.js';

import mainJSON from '../../config/main.json';


const loadedState = crossReducer(createStore(reducer).getState(), {
  type: LOAD_JSON_DATA,
  payload: {
    ...mainJSON,
    server: true,
  },
});
const store = createStore(reducer, loadedState);


const mainHTML = renderToStaticMarkup(
  <Provider store={store}>
    <Main />
  </Provider>
);
const render = () => ({ 'tmp/_ssr.html': mainHTML });


export default render;
