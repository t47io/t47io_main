import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import Main from './containers/index.jsx';
import reducer from './reducers/index.js';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  require('preact/devtools');

  const createLogger = require('redux-logger');
  const logger = createLogger();
  middleware.push(logger);
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);

// import AsyncComponent from './components/loading/jsx/async.jsx';
// import HelixLoading from './components/loading/jsx/helix.jsx';


// const loader = (callback) => {
//   require.ensure(['./components/index/index.jsx'], () => {
//     const Main = require('./components/index/index.jsx');

//     callback(Main, {
//       ...(require('../public/config.json')),
//       svg: require('../public/data/git_contrib.svg')
//     });
//   }, 'main');
// }


// ReactDOM.render(
//   <AsyncComponent loader={loader} placeholder={<HelixLoading />} />,
//   document.getElementById("app")
// );
