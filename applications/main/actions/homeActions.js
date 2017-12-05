import {
  TOGGLE_HOME_READY,
  TOGGLE_HOME_AVATAR_ANIMATION,
  TOGGLE_HOME_INTRO_ANIMATION,
  TOGGLE_HOME_TEXT_COLOR,
} from '../constants/actionTypes.js';
import {
  AVATAR_SVG_DRAW_DURATION,
  SHADE_FADE_DELAY_2,
} from '../animations/home.js';
import { delayFor } from '../../common/util.js';


export const animateReady = () => (dispatch) => {
  const loadingContainer = document.querySelector('.LOAD__container');
  loadingContainer.classList.add('fade');
  return Promise.resolve(
    dispatch({ type: TOGGLE_HOME_READY })
  )
  .then(() => delayFor(1000))
  .then(() => {
    // z-index does not obey transition
    loadingContainer.classList.add('behind');
  });
};


export const animateAvatar = () => ({ type: TOGGLE_HOME_AVATAR_ANIMATION });
export const animateIntro = () => ({ type: TOGGLE_HOME_INTRO_ANIMATION });
export const animateTextColor = () => ({ type: TOGGLE_HOME_TEXT_COLOR });

export const animateHome = () => dispatch => (
  Promise.resolve(
    dispatch(animateAvatar())
  )
  .then(() => delayFor(AVATAR_SVG_DRAW_DURATION))
  .then(() => dispatch(animateIntro()))
  .then(() => delayFor(SHADE_FADE_DELAY_2))
  .then(() => dispatch(animateTextColor()))
);
