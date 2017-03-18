import { TOGGLE_FOOTER_ANIMATION } from '../constants/actionTypes.js';

const initialState = {
  animations: {
    footer: true,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_FOOTER_ANIMATION:
      return {
        ...state,
        animations: { footer: payload.status },
      };

    default:
      return state;
  }
};


export default reducer;
