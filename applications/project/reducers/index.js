import { LOAD_JSON_DATA } from '../constants/actionTypes.js';


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
};

const crossReducer = (state = initialState, { type, payload }) => {
  if (type !== LOAD_JSON_DATA) { return state; }
  return payload;
};


export default crossReducer;
