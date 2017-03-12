import { TOGGLE_HEADER_ANIMATION } from '../../main/constants/actionTypes.js';


export const toggleHeaderAnimation = (section, status) => ({
  type: TOGGLE_HEADER_ANIMATION,
  payload: { section, status },
});
