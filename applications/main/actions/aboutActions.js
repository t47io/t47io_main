import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import { TOGGLE_ABOUT_ICON_ANIMATION } from '../constants/actionTypes.js';
import { ABOUT } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, ABOUT);

export const animateIcons = status => ({
  type: TOGGLE_ABOUT_ICON_ANIMATION,
  payload: { status },
});
