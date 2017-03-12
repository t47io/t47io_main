import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';

import * as actionTypes from '../constants/actionTypes.js';
import { ABOUT } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, ABOUT);

export const animateIcons = status => ({
  type: actionTypes.TOGGLE_ABOUT_ICON_ANIMATION,
  payload: { status },
});

export const playHeaderAnimation = () => ({
  type: actionTypes.PLAY_SCROLL_ANIMATION,
});

export const resetHeaderAnimation = () => ({
  type: actionTypes.RESET_SCOLL_ANIMATION,
});
