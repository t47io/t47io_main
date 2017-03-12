import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';

import * as actionTypes from '../constants/actionTypes.js';
import { PUBS } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, PUBS);

const entryCounter = status => ({
  type: actionTypes.TOGGLE_PUBS_ENTRY_ANIMATION,
  payload: { status },
});

export const animateEntries = status => (
  (dispatch, getState) => {
    if (!status) { return dispatch(entryCounter(0)); }
    const { pubs: { data: { lens } } } = getState();

    return (() => {
      for (let i = 0; i < lens; i += 1) {
        setTimeout(() => dispatch(entryCounter(i + 1)), i * 125);
      }
    })();
  }
);
