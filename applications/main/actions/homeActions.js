import {
  TOGGLE_HOME_NAME_ANIMATION,
  TOGGLE_HOME_TITLE_ANIMATION,
  TOGGLE_HOME_SHADE_ANIMATION,
} from '../constants/actionTypes.js';


// export const loadJsonData = () => (
//   dispatch => (
//     fetch('/config.json')
//     .then(response => response.json())
//     .then(json => dispatch({
//       type: LOAD_JSON_DATA,
//       payload: { ...json },
//     }))
//     .catch(() => console.error('Failed to fetch config.json.'))
//   )
// );

export const animateName = status => ({
  type: TOGGLE_HOME_NAME_ANIMATION,
  payload: { status },
});

export const animateTitle = status => ({
  type: TOGGLE_HOME_TITLE_ANIMATION,
  payload: { status },
});

export const animateShade = status => ({
  type: TOGGLE_HOME_SHADE_ANIMATION,
  payload: { status },
});
