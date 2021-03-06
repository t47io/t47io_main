import {
  UPDATE_NAVBAR_SCROLLSPY,
  SCROLL_NAVBAR_SECTION,
  TOGGLE_NAVBAR_COLLAPSE,
} from '../constants/actionTypes.js';
import { HOME } from '../../main/constants/sectionTypes.js';

export const initialState = {
  data: {
    items: [],
  },
  animations: {
    activeSection: HOME,
    isMobileCollapsed: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NAVBAR_COLLAPSE: {
      return {
        ...state,
        animations: {
          ...state.animations,
          isMobileCollapsed: !state.animations.isMobileCollapsed,
        },
      };
    }
    case SCROLL_NAVBAR_SECTION: {
      return {
        ...state,
        animations: {
          ...state.animations,
          isMobileCollapsed: false,
          activeSection: payload.section,
        },
      };
    }
    case UPDATE_NAVBAR_SCROLLSPY: {
      return {
        ...state,
        animations: {
          ...state.animations,
          activeSection: payload.section,
        },
      };
    }
    default: {
      return state;
    }
  }
};


export default reducer;
