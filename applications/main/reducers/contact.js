import { TOGGLE_HEADER_ANIMATION } from '../../common/constants/actionTypes.js';
import {
  TOGGLE_CONTACT_ICON_ANIMATION,
  TOGGLE_CONTACT_ITEM_ANIMATION,
  CHANGE_CONTACT_FIELD,
  SUBMIT_CONTACT_EMAIL_RESET,
  SUBMIT_CONTACT_EMAIL_SUCCESS,
  SUBMIT_CONTACT_EMAIL_ERROR,
  SUBMIT_CONTACT_EMAIL_WAIT,
} from '../constants/actionTypes.js';
import { CONTACT } from '../constants/sectionTypes.js';


export const initialState = {
  data: {
    items: [],
    backgrounds: [],
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
    header: false,
    icon: false,
    left: false,
    right: false,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_HEADER_ANIMATION: {
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
    }
    case TOGGLE_CONTACT_ICON_ANIMATION: {
      return {
        ...state,
        animations: {
          ...state.animations,
          icon: payload.status,
        },
      };
    }
    case TOGGLE_CONTACT_ITEM_ANIMATION: {
      return {
        ...state,
        animations: {
          ...state.animations,
          ...payload,
        },
      };
    }
    case CHANGE_CONTACT_FIELD: {
      return {
        ...state,
        form: {
          ...state.form,
          ...payload,
        },
      };
    }
    case SUBMIT_CONTACT_EMAIL_RESET: {
      return {
        ...state,
        form: {
          ...state.form,
          isPending: false,
          isSuccess: false,
          isError: false,
        },
        animations: {
          ...state.animations,
          right: false,
        },
      };
    }
    case SUBMIT_CONTACT_EMAIL_SUCCESS: {
      return {
        ...state,
        form: {
          ...state.form,
          isPending: false,
          isSuccess: true,
          isError: false,
        },
        animations: {
          ...state.animations,
          right: false,
        },
      };
    }
    case SUBMIT_CONTACT_EMAIL_ERROR: {
      return {
        ...state,
        form: {
          ...state.form,
          isPending: false,
          isSuccess: false,
          isError: true,
        },
        animations: {
          ...state.animations,
          right: false,
        },
      };
    }
    case SUBMIT_CONTACT_EMAIL_WAIT: {
      return {
        ...state,
        form: {
          ...state.form,
          isPending: true,
          isSuccess: false,
          isError: false,
        },
        animations: {
          ...state.animations,
          right: false,
        },
      };
    }
    default: {
      return state;
    }
  }
};


export default reducer;
