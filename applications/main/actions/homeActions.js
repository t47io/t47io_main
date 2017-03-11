import 'whatwg-fetch';

import * as actionTypes from '../constants/actionTypes.js';


export const loadJsonData = () => (
  dispatch => (
    fetch('/config.json')
    .then(response => response.json())
    .then(json => dispatch({
      type: actionTypes.LOAD_JSON_DATA,
      payload: { ...json },
    }))
    .catch(() => console.error('Failed to fetch config.json.'))
  )
);
