import { PROJECT_LIST } from '../constants/projectTypes.js';


const initialState = Object.fromEntries(PROJECT_LIST.map(proj => ([proj, {}])));
const projectReducer = (state = initialState, { type }) => {
  switch (type) {
    default: {
      return state;
    }
  }
};


export default projectReducer;
