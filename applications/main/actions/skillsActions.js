import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import { TOGGLE_SKILLS_PROGRESSBAR_ANIMATION } from '../constants/actionTypes.js';
import {
  SKILLS,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, SKILLS);

const progressBarCounter = (side, status) => ({
  type: TOGGLE_SKILLS_PROGRESSBAR_ANIMATION,
  payload: { [side.slice(7).toLowerCase()]: status },
});

const animateProgressBars = (side, status) => (
  (dispatch, getState) => {
    if (!status) { return dispatch(progressBarCounter(side, 0)); }
    const { skills: { data: { lens } } } = getState();
    const len = (side === SKILLS_LEFT) ? lens.left : lens.right;

    return (() => {
      for (let i = 0; i < len; i += 1) {
        setTimeout(() => dispatch(progressBarCounter(side, i + 1)), i * 125);
      }
    })();
  }
);

export const animateLeftBars = animateProgressBars.bind(null, SKILLS_LEFT);
export const animateRightBars = animateProgressBars.bind(null, SKILLS_RIGHT);
