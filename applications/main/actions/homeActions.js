import {
  TOGGLE_HOME_READY,
  TOGGLE_HOME_AVATAR_ANIMATION,
  TOGGLE_HOME_INTRO_ANIMATION,
  CYCLE_HOME_TEXT_COLOR,
} from '../constants/actionTypes.js';
import { TEXT_COLOR_CYCLE } from '../../common/constants/util.js';
import {
  AVATAR_SVG_DRAW_DURATION,
  HOME_TEXT_COLOR_INTERVAL,
  SHADE_FADE_DELAY_2,
} from '../animations/home.js';


export const animateReady = () => (dispatch) => {
  const loadingContainer = document.querySelector('.LOAD__container');
  loadingContainer.classList.add('fade');
  dispatch({ type: TOGGLE_HOME_READY });

  // z-index does not obey transition
  setTimeout(() => loadingContainer.classList.add('behind'), 1000);
};

export const animateTextColorCycle = status => ({
  type: CYCLE_HOME_TEXT_COLOR,
  payload: { status },
});

export const animateAvatar = () => ({ type: TOGGLE_HOME_AVATAR_ANIMATION });
export const animateIntro = () => ({ type: TOGGLE_HOME_INTRO_ANIMATION });

export const animateHome = () => (dispatch) => {
  dispatch(animateAvatar());

  setTimeout(() => dispatch(animateIntro()), AVATAR_SVG_DRAW_DURATION);
  setTimeout(() => {
    let status = 0;

    setInterval(() => {
      status = (status + 1) % TEXT_COLOR_CYCLE.length;
      dispatch(animateTextColorCycle(status));
    }, HOME_TEXT_COLOR_INTERVAL);
  }, SHADE_FADE_DELAY_2 + AVATAR_SVG_DRAW_DURATION);
};
