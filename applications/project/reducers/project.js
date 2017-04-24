import { LOAD_PROJECT_JSON_DATA } from '../constants/actionTypes.js';
import { PROJECT_LIST } from '../constants/projectTypes.js';


const initialState = PROJECT_LIST.map(proj => ({
  [proj]: {},
}))
.reduce((obj, item) => ({
  ...obj,
  ...item,
}), {});

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PROJECT_JSON_DATA:
      return payload;

    default:
      return state;
  }
};


export default projectReducer;
