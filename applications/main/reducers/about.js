import * as actionTypes from '../constants/actionTypes.js';
import { ABOUT } from '../constants/sectionTypes.js';


const initialState = {
  data: {
    items: [],
  },
  animation: {
    header: false,
    icons: 0,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_HEADER_ANIMATION:
      if (payload.section === ABOUT) {
        return {
          ...state,
          animation: {
            ...state.animation,
            header: payload.status,
          },
        };
      }

    case actionTypes.TOGGLE_ABOUT_ICON_ANIMATION:
      return {
        ...state,
        animation: {
          ...state.animation,
          icons: payload.status,
        },
      };

    default:
      return state;
  }
};


export default reducer;
