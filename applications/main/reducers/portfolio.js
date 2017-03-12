import * as actionTypes from '../constants/actionTypes.js';
import { PORTFOLIO } from '../constants/sectionTypes.js';


const initialState = {
  data: {
    items: [],
    category: [],
  },
  animations: {
    header: true,
    filter: NaN,
    thumbnail: NaN,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_HEADER_ANIMATION:
      if (payload.section === PORTFOLIO) {
        return {
          ...state,
          animations: {
            ...state.animations,
            header: payload.status,
          },
        };
      }
      return state;

    case actionTypes.TOGGLE_PORTFOLIO_FILTER_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          filter: payload.status,
        },
      };

    case actionTypes.TOGGLE_PORTFOLIO_THUMBNAIL_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          thumbnail: payload.status,
        },
      };

    default:
      return state;
  }
};


export default reducer;
