import * as actionTypes from '../constants/actionTypes.js';
import { CONTACT } from '../constants/sectionTypes.js';


const initialState = {
  data: {
    items: [],
    background: [],
    resume: '',
    lens: {
      left: 0,
      right: 0,
    },
  },
  form: {
    name: '',
    email: '',
    subject: '',
    message: '',
    isPending: false,
    isSuccess: false,
    isError: false,
  },
  animations: {
    header: true,
    icon: NaN,
    left: NaN,
    right: NaN,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_HEADER_ANIMATION:
      if (payload.section === CONTACT) {
        return {
          ...state,
          animations: {
            ...state.animations,
            header: payload.status,
          },
        };
      }
      return state;

    case actionTypes.TOGGLE_CONTACT_ICON_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          icon: payload.status,
        },
      };

    case actionTypes.TOGGLE_CONTACT_ITEM_ANIMATION:
      return {
        ...state,
        animations: {
          ...state.animations,
          ...payload,
        },
      };

    case actionTypes.CHANGE_CONTACT_FIELD:
      return {
        ...state,
        form: {
          ...state.form,
          ...payload,
        },
      };

    case actionTypes.SUBMIT_CONTACT_EMAIL_RESET:
      return {
        ...state,
        form: {
          ...state.form,
          isPending: false,
          isSuccess: false,
          isError: false,
        },
      };

    case actionTypes.SUBMIT_CONTACT_EMAIL_SUCCESS:
      return {
        ...state,
        form: {
          ...state.form,
          isPending: false,
          isSuccess: true,
          isError: false,
        },
      };

    case actionTypes.SUBMIT_CONTACT_EMAIL_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          isPending: false,
          isSuccess: false,
          isError: true,
        },
      };

    case actionTypes.SUBMIT_CONTACT_EMAIL_WAIT:
      return {
        ...state,
        form: {
          ...state.form,
          isPending: true,
          isSuccess: false,
          isError: false,
        },
      };

    default:
      return state;
  }
};


export default reducer;
