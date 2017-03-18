import * as actionTypes from '../constants/actionTypes.js';

const initialState = {
  animations: {
    footer: true,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_FOOTER_ANIMATION:
      return {
        ...state,
        animations: { footer: payload.status },
      };

    default:
      return state;
  }
};


export default reducer;
