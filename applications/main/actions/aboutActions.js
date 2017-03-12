import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';

import * as actionTypes from '../constants/actionTypes.js';
import { ABOUT } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, ABOUT);

const iconCounter = status => ({
  type: actionTypes.TOGGLE_ABOUT_ICON_ANIMATION,
  payload: { status },
});

export const animateIcons = status => (
  (dispatch, getState) => {
    if (!status) { return dispatch(iconCounter(0)); }
    const { about: { data: { items } } } = getState();

    return (() => {
      for (let i = 0; i < items.length; i += 1) {
        setTimeout(() => dispatch(iconCounter(i + 1)), i * 250);
      }
    })();
  }
);
