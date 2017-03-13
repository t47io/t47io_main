import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';

import * as actionTypes from '../constants/actionTypes.js';
import { CONTACT,
  CONTACT_LEFT,
  CONTACT_RIGHT,
} from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, CONTACT);

const iconCounter = status => ({
  type: actionTypes.TOGGLE_CONTACT_ICON_ANIMATION,
  payload: { status },
});

export const animateIcons = status => (
  (dispatch, getState) => {
    if (!status) { return dispatch(iconCounter(0)); }
    const { contact: { data: { items } } } = getState();

    return (() => {
      for (let i = 0; i < items.length; i += 1) {
        setTimeout(() => dispatch(iconCounter(i + 1)), i * 250);
      }
    })();
  }
);

const contactItemCounter = (side, status) => ({
  type: actionTypes.TOGGLE_CONTACT_ITEM_ANIMATION,
  payload: { [side.slice(8).toLowerCase()]: status },
});

const animateItems = (side, status) => (
  (dispatch, getState) => {
    if (!status) { return dispatch(contactItemCounter(side, 0)); }
    const { contact: { data: { lens } } } = getState();
    const len = (side === CONTACT_LEFT) ? lens.left : lens.right;

    return (() => {
      for (let i = 0; i < len; i += 1) {
        setTimeout(() => dispatch(contactItemCounter(side, i + 1)), i * 125);
      }
    })();
  }
);

export const animateLeftItems = animateItems.bind(null, CONTACT_LEFT);
export const animateRightItems = animateItems.bind(null, CONTACT_RIGHT);

export const changeEmailField = data => ({
  type: actionTypes.CHANGE_CONTACT_FIELD,
  payload: { ...data },
});

export const submitEmailReset = () => ({ type: actionTypes.SUBMIT_CONTACT_EMAIL_RESET });

export const submitEmailSuccess = () => ({ type: actionTypes.SUBMIT_CONTACT_EMAIL_SUCCESS });

export const submitEmailError = () => (
  (dispatch) => {
    dispatch({ type: actionTypes.SUBMIT_CONTACT_EMAIL_ERROR });
    setTimeout(() => dispatch(submitEmailReset()), 4000);
  }
);

export const submitEmail = () => (
  (dispatch, getState) => {
    dispatch({ type: actionTypes.SUBMIT_CONTACT_EMAIL_WAIT });
    const { contact: { form: { name, email, subject, message } } } = getState();

    return fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    })
    .then((response) => {
      if (response.status === 201) {
        setTimeout(() => {
          window.location.href = '/send?success=1';
        }, 1500);
        return dispatch(submitEmailSuccess());
      }
      return dispatch(submitEmailError());
    })
    .catch((error) => {
      console.error(error);
      return dispatch(submitEmailError());
    });
  }
);
