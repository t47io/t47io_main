import {
  TOGGLE_HOME_READY,
  TOGGLE_HOME_INTRO_ANIMATION,
  CYCLE_HOME_TEXT_COLOR,
} from '../constants/actionTypes.js';


export const initialState = {
  data: {
    title: '',
    loaded: false,
    server: false,
  },
  animations: {
    ready: false,
    intro: false,
    color: 0,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HOME_READY: {
      return {
        ...state,
        animations: {
          ...state.animations,
          ready: true,
        },
      };
    }
    case TOGGLE_HOME_INTRO_ANIMATION: {
      return {
        ...state,
        animations: {
          ...state.animations,
          intro: true,
        },
      };
    }
    case CYCLE_HOME_TEXT_COLOR: {
      return {
        ...state,
        animations: {
          ...state.animations,
          color: payload.status,
        },
      };
    }
    default: {
      return state;
    }
  }
};


export default reducer;
