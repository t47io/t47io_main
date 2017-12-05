import {
  TOGGLE_HOME_READY,
  TOGGLE_HOME_AVATAR_ANIMATION,
  TOGGLE_HOME_INTRO_ANIMATION,
  CYCLE_HOME_TEXT_COLOR,
} from '../constants/actionTypes.js';
import { TEXT_COLORS } from '../constants/util.js';
import {
  AVATAR_SVG_DRAW_DURATION,
  HOME_TEXT_COLOR_INTERVAL,
  SHADE_FADE_DELAY_2,
} from '../animations/home.js';
import { delay } from '../util.js';


export const animateReady = () => (dispatch) => {
  const loadingContainer = document.querySelector('.LOAD__container');
  loadingContainer.classList.add('fade');
  return Promise.resolve(
    dispatch({ type: TOGGLE_HOME_READY })
  )
  .then(() => delay(1000))
  .then(() => {
    // z-index does not obey transition
    loadingContainer.classList.add('behind');
  });
};

export const animateTextColorCycle = () => ({ type: CYCLE_HOME_TEXT_COLOR });

export const animateAvatar = () => ({ type: TOGGLE_HOME_AVATAR_ANIMATION });
export const animateIntro = () => ({ type: TOGGLE_HOME_INTRO_ANIMATION });

export const animateHome = () => dispatch => (
  Promise.resolve(
    dispatch(animateAvatar())
  )
  .then(() => delay(AVATAR_SVG_DRAW_DURATION))
  .then(() => dispatch(animateIntro()))
  .then(() => delay(SHADE_FADE_DELAY_2))
  .then(() => dispatch(animateTextColorCycle()))
);
