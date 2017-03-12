import * as actionTypes from '../constants/actionTypes.js';
import { ABOUT } from '../constants/sectionTypes.js';


const initialState = {
  data: {
    items: [],
  },
  animations: {
    header: true,
    icon: NaN,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_HEADER_ANIMATION:
      if (payload.section === ABOUT) {
        return {
          ...state,
          animations: {
            ...state.animations,
            header: payload.status,
          },
        };
      }
      return state;

    case actionTypes.TOGGLE_ABOUT_ICON_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          icon: payload.status,
        },
      };

    default:
      return state;
  }
};


export default reducer;
