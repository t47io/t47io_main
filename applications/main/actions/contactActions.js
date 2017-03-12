import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';

import * as actionTypes from '../constants/actionTypes.js';
import {
  CONTACT,
  CONTACT_LEFT,
  CONTACT_RIGHT,
} from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, CONTACT);

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

const contactItemCounter = (side, status) => ({
  type: actionTypes.TOGGLE_CONTACT_PROGRESSBAR_ANIMATION,
  payload: { side, status },
});

const aniamteItems = (side, status) => (
  (dispatch, getState) => {
    if (!status) { return dispatch(contactItemCounter(side, 0)); }
    const { CONTACT: { data: { lens } } } = getState();
    const len = (side === CONTACT_LEFT) ? lens.left : lens.right;

    return (() => {
      for (let i = 0; i < len; i += 1) {
        setTimeout(() => dispatch(contactItemCounter(side, i + 1)), i * 250);
      }
    })();
  }
);

export const animateLeftItems = aniamteItems.bind(null, CONTACT_LEFT);
export const animateRightItems = aniamteItems.bind(null, CONTACT_RIGHT);
