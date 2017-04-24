import { TOGGLE_HEADER_ANIMATION } from '../../common/constants/actionTypes.js';
import {
  TOGGLE_STATS_COUNTER_ANIMATION,
  TOGGLE_STATS_GITHUB_ANIMATION,
} from '../constants/actionTypes.js';
import { STATS } from '../constants/sectionTypes.js';


export const initialState = {
  data: {
    items: [],
    backgrounds: [],
    links: {
      github: '',
      githubMitned: '',
    },
    gitContrib: {
      startDate: '',
      countArray: [],
      indexArray: [],
      maxCount: 0,
      monthText: {},
    },
  },
  animations: {
    header: false,
    counter: false,
    github: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HEADER_ANIMATION:
      if (payload.section === STATS) {
        return {
          ...state,
          animations: {
            ...state.animations,
            header: payload.status,
          },
        };
      }
      return state;

    case TOGGLE_STATS_COUNTER_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          counter: payload.status,
        },
      };

    case TOGGLE_STATS_GITHUB_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          github: payload.status,
        },
      };

    default:
      return state;
  }
};


export default reducer;
