import * as actionTypes from '../constants/actionTypes.js';


const initialState = {
  data: {
    items: [],
    links: {
      googleScholar: '',
      pubmed: '',
    },
  },
  animation: {

  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {


    default:
      return state;
  }
};


export default reducer;
