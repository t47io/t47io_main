import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/index/index.jsx';

ReactDOM.render(
  <Main {...(require('../public/config.json'))}
    svg={require('../public/data/git_contrib.svg')} />,
  document.getElementById("app")
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
