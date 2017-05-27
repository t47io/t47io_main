import { PROJECT_LIST } from '../constants/projectTypes.js';


const initialState = PROJECT_LIST.map(proj => ({
  [proj]: {},
}))
.reduce((obj, item) => ({
  ...obj,
  ...item,
}), {});

const projectReducer = (state = initialState, { type }) => {
  switch (type) {
    default: {
      return state;
    }
  }
};


export default projectReducer;
