import { TOGGLE_HEADER_ANIMATION } from '../../common/constants/actionTypes.js';
import {
  TOGGLE_PORTFOLIO_FILTER_ANIMATION,
  TOGGLE_PORTFOLIO_THUMBNAIL_ANIMATION,
  CHANGE_PORTFOLIO_FILTER,
} from '../constants/actionTypes.js';
import { PORTFOLIO } from '../constants/sectionTypes.js';


export const initialState = {
  data: {
    items: [],
    categories: [],
    brands: [],
    selectedCategory: 'all',
  },
  animations: {
    header: false,
    filter: false,
    thumbnail: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HEADER_ANIMATION: {
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
    }
    case TOGGLE_PORTFOLIO_FILTER_ANIMATION: {
      return {
        ...state,
        animations: {
          ...state.animations,
          filter: payload.status,
        },
      };
    }
    case TOGGLE_PORTFOLIO_THUMBNAIL_ANIMATION: {
      return {
        ...state,
        animations: {
          ...state.animations,
          thumbnail: payload.status,
        },
      };
    }
    case CHANGE_PORTFOLIO_FILTER: {
      return {
        ...state,
        data: {
          ...state.data,
          selectedCategory: payload.category,
        },
      };
    }
    default: {
      return state;
    }
  }
};


export default reducer;
