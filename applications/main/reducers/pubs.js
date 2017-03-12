import * as actionTypes from '../constants/actionTypes.js';
import { PUBS } from '../constants/sectionTypes.js';


const initialState = {
  data: {
    items: [],
    links: {
      googleScholar: '',
      pubmed: '',
    },
    lens: 0,
  },
  animations: {
    header: true,
    entry: NaN,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_HEADER_ANIMATION:
      if (payload.section === PUBS) {
        return {
          ...state,
          animations: {
            ...state.animations,
            header: payload.status,
          },
        };
      }
      return state;

    case actionTypes.TOGGLE_PUBS_ENTRY_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          entry: payload.status,
        },
      };

    default:
      return state;
  }
};


export default reducer;
