import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import {
  TOGGLE_PORTFOLIO_THUMBNAIL_ANIMATION,
  TOGGLE_PORTFOLIO_FILTER_ANIMATION,
  CHANGE_PORTFOLIO_FILTER,
} from '../constants/actionTypes.js';
import { PORTFOLIO } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, PORTFOLIO);

export const animateThumbnails = status => ({
  type: TOGGLE_PORTFOLIO_THUMBNAIL_ANIMATION,
  payload: { status },
});

export const animateFilters = status => ({
  type: TOGGLE_PORTFOLIO_FILTER_ANIMATION,
  payload: { status },
});

export const changeFilter = category => ({
  type: CHANGE_PORTFOLIO_FILTER,
  payload: { category },
});
