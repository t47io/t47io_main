import * as actionTypes from '../constants/actionTypes.js';


export const playHeaderAnimation = () => ({
  type: actionTypes.PLAY_SCROLL_ANIMATION,
});

export const resetHeaderAnimation = () => ({
  type: actionTypes.RESET_SCOLL_ANIMATION,
});
