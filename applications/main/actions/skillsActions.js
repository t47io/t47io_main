import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import { TOGGLE_SKILLS_PROGRESSBAR_ANIMATION } from '../constants/actionTypes.js';
import {
  SKILLS,
  SKILLS_LEFT,
  SKILLS_RIGHT,
} from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, SKILLS);

const animateProgressBars = (side, status) => ({
  type: TOGGLE_SKILLS_PROGRESSBAR_ANIMATION,
  payload: { [side.slice(7).toLowerCase()]: status },
});

export const animateLeftBars = animateProgressBars.bind(null, SKILLS_LEFT);
export const animateRightBars = animateProgressBars.bind(null, SKILLS_RIGHT);
