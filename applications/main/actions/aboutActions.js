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
    const { about: { data: { items } } } = getState();
    if (!status) { return dispatch(iconCounter(0)); }

    return (() => {
      for (let i = 1; i < items.length + 1; i += 1) {
        setTimeout(() => dispatch(iconCounter(i)), i * 250);
      }
    })();
  }
);
