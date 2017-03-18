import { TOGGLE_FOOTER_ANIMATION } from '../constants/actionTypes.js';


export const animateFooter = status => ({
  type: TOGGLE_FOOTER_ANIMATION,
  payload: { status },
});
