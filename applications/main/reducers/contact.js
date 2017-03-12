import * as actionTypes from '../constants/actionTypes.js';
import {
  CONTACT,
  CONTACT_LEFT,
  CONTACT_RIGHT,
} from '../constants/sectionTypes.js';


const initialState = {
  data: {
    items: [],
    background: [],
    resume: '',
    lens: {
      left: 0,
      right: 0,
    },
  },
  animations: {
    header: true,
    icon: NaN,
    left: NaN,
    right: NaN,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_HEADER_ANIMATION:
      if (payload.section === CONTACT) {
        return {
          ...state,
          animations: {
            ...state.animations,
            header: payload.status,
          },
        };
      }
      return state;

    case actionTypes.TOGGLE_CONTACT_ICON_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          icon: payload.status,
        },
      };

    case actionTypes.TOGGLE_CONTACT_ITEM_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          left: (payload.side === CONTACT_LEFT) ? payload.status : state.animations.left,
          right: (payload.side === CONTACT_RIGHT) ? payload.status : state.animations.right,
        },
      };

    default:
      return state;
  }
};


export default reducer;
