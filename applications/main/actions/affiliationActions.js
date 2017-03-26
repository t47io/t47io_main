import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import { UPDATE_AFFILIATION_SCROLLSPY } from '../constants/actionTypes.js';
import { AFFILIATION } from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, AFFILIATION);

export const animatePanels = status => (
  (dispatch, getState) => {
    const { affiliation: {
      animations: { panel },
      data: { items },
    } } = getState();
    const newPanel = Math.min(Math.max(status, 0), items.length);
    if (newPanel !== panel) {
      dispatch({
        type: UPDATE_AFFILIATION_SCROLLSPY,
        payload: { status: newPanel },
      });
    }
  }
);
