import {
  TOGGLE_HOME_READY,
  TOGGLE_HOME_AVATAR_ANIMATION,
  TOGGLE_HOME_INTRO_ANIMATION,
  TOGGLE_HOME_TEXT_COLOR,
} from '../constants/actionTypes.js';


export const initialState = {
  data: {
    title: '',
    loaded: false,
    server: false,
  },
  animations: {
    ready: false,
    avatar: false,
    intro: false,
    color: false,
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
    case TOGGLE_HOME_AVATAR_ANIMATION: {
      return {
        ...state,
        animations: {
          ...state.animations,
          avatar: true,
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
    case TOGGLE_HOME_TEXT_COLOR: {
      return {
        ...state,
        animations: {
          ...state.animations,
          color: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};


export default reducer;
