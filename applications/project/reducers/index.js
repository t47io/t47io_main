import { LOAD_JSON_DATA } from '../constants/actionTypes.js';
import {
  HOME,
  PORTFOLIO,
} from '../../main/constants/sectionTypes.js';
import { PROJECT_LIST } from '../constants/projectTypes.js';


const initialState = {
  ...(
    PROJECT_LIST.map(project => ({
      [project]: {},
    }))
    .reduce((obj, item) => ({
      ...obj,
      ...item,
    }), {})
  ),

  navbar: {
    data: {
      items: [
        HOME,
        PORTFOLIO,
      ],
      dropdown: PROJECT_LIST,
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
