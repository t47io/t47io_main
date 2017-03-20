import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import {
  TOGGLE_STATS_COUNTER_ANIMATION,
  TOGGLE_STATS_GITHUB_ANIMATION,
} from '../constants/actionTypes.js';
import { STATS } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, STATS);

export const animateCounters = status => ({
  type: TOGGLE_STATS_COUNTER_ANIMATION,
  payload: { status },
});

export const animateGithub = status => ({
  type: TOGGLE_STATS_GITHUB_ANIMATION,
  payload: { status },
});
