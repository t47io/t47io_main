import { TOGGLE_PAGE_READY } from '../constants/actionTypes.js';


export const animateReady = () => (
  (dispatch) => {
    const loadingContainer = document.querySelector('.LOAD__container');
    loadingContainer.style.opacity = 0;
    setTimeout(() => {
      dispatch({ type: TOGGLE_PAGE_READY });
      // z-index does not obey transition
      loadingContainer.style.zIndex = -1;
    }, 1000);
  }
);
