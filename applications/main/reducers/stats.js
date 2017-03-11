import * as actionTypes from '../constants/actionTypes.js';


const initialState = {
  data: {
    items: [],
    background: [],
    links: {
      github: '',
      githubMitned: '',
    },
    givSvg: '',
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
