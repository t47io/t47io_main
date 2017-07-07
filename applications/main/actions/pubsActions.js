import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import {
  TOGGLE_PUBS_ENTRY_ANIMATION,
  TOGGLE_PUBS_THESIS_ANIMATION,
} from '../constants/actionTypes.js';
import { PUBS } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, PUBS);

export const animateEntries = status => ({
  type: TOGGLE_PUBS_ENTRY_ANIMATION,
  payload: { status },
});

export const animateThesis = status => ({
  type: TOGGLE_PUBS_THESIS_ANIMATION,
  payload: { status },
});
