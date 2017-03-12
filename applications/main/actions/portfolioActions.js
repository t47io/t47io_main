import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';

import * as actionTypes from '../constants/actionTypes.js';
import { PORTFOLIO } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, PORTFOLIO);

const thumbnailCounter = status => ({
  type: actionTypes.TOGGLE_PORTFOLIO_THUMBNAIL_ANIMATION,
  payload: { status },
});

export const animateThumbnails = status => (
  (dispatch, getState) => {
    if (!status) { return dispatch(thumbnailCounter(0)); }
    const { portfolio: { data: { items } } } = getState();

    return (() => {
      for (let i = 0; i < items.length; i += 1) {
        setTimeout(() => dispatch(thumbnailCounter(i + 1)), i * 125);
      }
    })();
  }
);

const filterCounter = status => ({
  type: actionTypes.TOGGLE_PORTFOLIO_FILTER_ANIMATION,
  payload: { status },
});

export const animateFilters = status => (
  (dispatch, getState) => {
    if (!status) { return dispatch(filterCounter(0)); }
    const { portfolio: { data: { categories } } } = getState();

    return (() => {
      for (let i = 0; i < categories.length; i += 1) {
        setTimeout(() => dispatch(filterCounter(i + 1)), i * 125);
      }
    })();
  }
);

export const changeFilter = category => ({
  type: actionTypes.CHANGE_PORTFOLIO_FILTER,
  payload: { category },
});
