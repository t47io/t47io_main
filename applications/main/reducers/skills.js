import { TOGGLE_HEADER_ANIMATION } from '../../common/constants/actionTypes.js';
import { TOGGLE_SKILLS_PROGRESSBAR_ANIMATION } from '../constants/actionTypes.js';
import { SKILLS } from '../constants/sectionTypes.js';


export const initialState = {
  data: {
    items: {
      left: [],
      right: [],
    },
    lens: {
      left: 0,
      right: 0,
    },
  },
  animations: {
    header: false,
    left: false,
    right: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HEADER_ANIMATION: {
      if (payload.section === SKILLS) {
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
    case TOGGLE_SKILLS_PROGRESSBAR_ANIMATION: {
      return {
        ...state,
        animations: {
          ...state.animations,
          ...payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};


export default reducer;
