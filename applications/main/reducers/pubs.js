import { TOGGLE_HEADER_ANIMATION } from '../../common/constants/actionTypes.js';
import { TOGGLE_PUBS_ENTRY_ANIMATION } from '../constants/actionTypes.js';
import { PUBS } from '../constants/sectionTypes.js';


export const initialState = {
  data: {
    items: [],
    links: {
      googleScholar: '',
      pubmed: '',
    },
    lens: 0,
  },
  animations: {
    header: false,
    entry: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HEADER_ANIMATION:
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

    case TOGGLE_PUBS_ENTRY_ANIMATION:
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
