import { TOGGLE_HEADER_ANIMATION } from '../../common/constants/actionTypes.js';
import { UPDATE_AFFILIATION_SCROLLSPY } from '../constants/actionTypes.js';
import { AFFILIATION } from '../constants/sectionTypes.js';


const initialState = {
  data: {
    items: [],
    backgrounds: [],
  },
  animations: {
    header: false,
    panel: 0,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HEADER_ANIMATION:
      if (payload.section === AFFILIATION) {
        return {
          ...state,
          animations: {
            ...state.animations,
            header: payload.status,
          },
        };
      }
      return state;

    case UPDATE_AFFILIATION_SCROLLSPY:
      return {
        ...state,
        animations: {
          ...state.animations,
          panel: payload.status,
        },
      };

    default:
      return state;
  }
};


export default reducer;
