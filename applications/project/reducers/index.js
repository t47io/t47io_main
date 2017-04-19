import { LOAD_JSON_DATA } from '../constants/actionTypes.js';
import {
  HOME,
  PORTFOLIO,
} from '../../main/constants/sectionTypes.js';


const initialState = {
  daslab: {},
  primerize: {},
  rmdb: {},
  eterna: {},
  hitrace: {},
  spindle: {},
  ribokit: {},
  celica: {},

  _subtitles: {},

  navbar: {
    data: {
      items: [
        HOME,
        PORTFOLIO,
      ],
    },
    animations: {
      activeSection: PORTFOLIO,
      isMobileCollapsed: false,
    },
  },
  footer: {
    animations: { footer: false },
  },
};

const crossReducer = (state = initialState, { type, payload }) => {
  if (type !== LOAD_JSON_DATA) { return state; }
  return {
    ...state,
    ...payload,
  };
};


export default crossReducer;