import {
  TOGGLE_PAGE_READY,
  TOGGLE_SCROLLTOP_ANIMATION,
  LOAD_JSON_DATA,
} from '../constants/actionTypes.js';


export const initialState = {
  data: false,
  ready: false,
  scroll: false,
};

const dataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_PAGE_READY: {
      return {
        ...state,
        ready: true,
      };
    }
    case TOGGLE_SCROLLTOP_ANIMATION: {
      return {
        ...state,
        scroll: payload.status,
      };
    }
    case LOAD_JSON_DATA: {
      return {
        ...state,
        data: true,
      };
    }
    default: {
      return state;
    }
  }
};


export default dataReducer;
