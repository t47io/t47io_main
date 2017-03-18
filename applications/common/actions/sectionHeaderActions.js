import { TOGGLE_HEADER_ANIMATION } from '../constants/actionTypes.js';


export const toggleHeaderAnimation = (section, status) => ({
  type: TOGGLE_HEADER_ANIMATION,
  payload: { section, status },
});
