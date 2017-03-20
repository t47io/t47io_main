import smoothScroll from 'smoothscroll';

import {
  UPDATE_NAVBAR_SCROLLSPY,
  SCROLL_NAVBAR_SECTION,
  TOGGLE_NAVBAR_COLLAPSE,
} from '../constants/actionTypes.js';


export const updateNavbarScrollspy = section => (
  (dispatch, getState) => {
    const {
      navbar: {
        data: { items },
        animations: { activeSection },
      },
    } = getState();
    const currentIndex = items.indexOf(activeSection);
    const nextIndex = Math.max(Math.min(section, items.length - 1), 0);

    if (currentIndex !== nextIndex) {
      dispatch({
        type: UPDATE_NAVBAR_SCROLLSPY,
        payload: { section: items[nextIndex] },
      });
    }
  }
);

export const toggleMobileCollapse = () => ({ type: TOGGLE_NAVBAR_COLLAPSE });

export const scrollToSection = section => (
  (dispatch, getState) => {
    const {
      navbar: {
        data: { items },
        animations: { activeSection },
      },
    } = getState();
    const distance = Math.abs(items.indexOf(activeSection) - items.indexOf(section));

    smoothScroll(
      document.getElementById(`${section}__section`),
      distance * 800
    );

    dispatch({
      type: SCROLL_NAVBAR_SECTION,
      payload: { section },
    });
  }
);
