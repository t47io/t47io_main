import {
  TOGGLE_HOME_NAME_ANIMATION,
  TOGGLE_HOME_TITLE_ANIMATION,
  TOGGLE_HOME_SHADE_ANIMATION,
  CYCLE_HOME_TEXT_COLOR,
} from '../constants/actionTypes.js';


const initialState = {
  data: {
    title: '',
  },
  animations: {
    name: false,
    type: false,
    shade: false,
    color: 0,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HOME_NAME_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          name: payload.status,
        },
      };

    case TOGGLE_HOME_TITLE_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          type: payload.status,
        },
      };

    case TOGGLE_HOME_SHADE_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          shade: payload.status,
        },
      };

    case CYCLE_HOME_TEXT_COLOR:
      return state;

    default:
      return state;
  }
};


export default reducer;
