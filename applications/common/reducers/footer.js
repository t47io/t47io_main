import { TOGGLE_FOOTER_ANIMATION } from '../constants/actionTypes.js';

export const initialState = {
  animations: {
    footer: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_FOOTER_ANIMATION: {
      return {
        ...state,
        animations: { footer: payload.status },
      };
    }
    default: {
      return state;
    }
  }
};


export default reducer;
