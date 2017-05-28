import {
  TOGGLE_PAGE_READY,
  TOGGLE_SCROLLTOP_ANIMATION,
} from '../constants/actionTypes.js';


export const animateReady = () => (dispatch) => {
  const loadingContainer = document.querySelector('.LOAD__container');
  loadingContainer.classList.add('fade');
  dispatch({ type: TOGGLE_PAGE_READY });

  // z-index does not obey transition
  setTimeout(() => loadingContainer.classList.add('behind'), 1000);
};

export const aniamteScrollTop = status => ({
  type: TOGGLE_SCROLLTOP_ANIMATION,
  payload: { status },
});
