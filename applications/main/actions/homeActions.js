import {
  TOGGLE_HOME_READY,
  TOGGLE_HOME_INTRO_ANIMATION,
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

export const animateReady = () => (
  (dispatch) => {
    document.querySelector('.LOAD__container').className += ' ready';

    dispatch({ type: TOGGLE_HOME_READY });
  }
);

export const animateIntro = () => ({ type: TOGGLE_HOME_INTRO_ANIMATION });
