import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import {
  TOGGLE_STATS_COUNTER_ANIMATION,
  TOGGLE_STATS_GITHUB_ANIMATION,
} from '../constants/actionTypes.js';
import { STATS } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, STATS);

const counterCounter = status => ({
  type: TOGGLE_STATS_COUNTER_ANIMATION,
  payload: { status },
});

export const animateCounters = status => (
  (dispatch, getState) => {
    if (!status) { return dispatch(counterCounter(0)); }
    const { stats: { data: { items } } } = getState();

    return (() => {
      for (let i = 0; i < items.length; i += 1) {
        setTimeout(() => dispatch(counterCounter(i + 1)), i * 500);
      }
    })();
  }
);

export const animateGithub = status => ({
  type: TOGGLE_STATS_GITHUB_ANIMATION,
  payload: { status },
});
