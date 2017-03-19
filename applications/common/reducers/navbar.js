import {
  UPDATE_NAVBAR_SCROLLSPY,
  SCROLL_NAVBAR_SECTION,
  TOGGLE_NAVBAR_COLLAPSE,
} from '../constants/actionTypes.js';

const initialState = {
  data: {
    items: [],
    activeSection: 'home',
    isMobileCollapsed: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NAVBAR_COLLAPSE:
      return {
        data: {
          ...state.data,
          isMobileCollapsed: !state.data.isMobileCollapsed,
        },
      };

    case SCROLL_NAVBAR_SECTION:
      return {
        data: {
          ...state.data,
          isMobileCollapsed: false,
        },
      };

    case UPDATE_NAVBAR_SCROLLSPY:
      return {
        data: {
          ...state.data,
          activeSection: payload.section,
        },
      };

    default:
      return state;
  }
};


export default reducer;
