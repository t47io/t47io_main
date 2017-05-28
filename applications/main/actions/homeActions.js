import {
  TOGGLE_HOME_READY,
  TOGGLE_HOME_INTRO_ANIMATION,
  CYCLE_HOME_TEXT_COLOR,
} from '../constants/actionTypes.js';
import { TEXT_COLOR_CYCLE } from '../../common/constants/util.js';

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

export const animateReady = () => (dispatch) => {
  const loadingContainer = document.querySelector('.LOAD__container');
  loadingContainer.classList.add('fade');
  dispatch({ type: TOGGLE_HOME_READY });

  // z-index does not obey transition
  setTimeout(() => loadingContainer.classList.add('behind'), 1000);
};

export const animateIntro = () => (dispatch) => {
  dispatch({ type: TOGGLE_HOME_INTRO_ANIMATION });

  setTimeout(() => {
    let status = 0;

    setInterval(() => {
      status = (status + 1) % TEXT_COLOR_CYCLE.length;
      dispatch({
        type: CYCLE_HOME_TEXT_COLOR,
        payload: { status },
      });
    }, 2500);
  }, 76 * 125 + 1250 + 750);
};
