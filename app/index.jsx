import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/index/index.jsx';

require("font-awesome-loader");


ReactDOM.render(
  <Main {...(require('../public/config.json'))}
  	svg={require('../public/data/git_contrib.svg')} />,
  document.getElementById("app")
);
