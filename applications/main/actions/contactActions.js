import 'whatwg-fetch';

import { toggleHeaderAnimation } from '../../common/actions/sectionHeaderActions.js';
import {
  TOGGLE_CONTACT_ICON_ANIMATION,
  TOGGLE_CONTACT_ITEM_ANIMATION,
  CHANGE_CONTACT_FIELD,
  SUBMIT_CONTACT_EMAIL_RESET,
  SUBMIT_CONTACT_EMAIL_SUCCESS,
  SUBMIT_CONTACT_EMAIL_ERROR,
  SUBMIT_CONTACT_EMAIL_WAIT,
  TOGGLE_AUDIO_PLAYBACK,
} from '../constants/actionTypes.js';
import {
  CONTACT,
  CONTACT_LEFT,
  CONTACT_RIGHT,
} from '../constants/sectionTypes.js';


export const animateHeader = toggleHeaderAnimation.bind(null, CONTACT);

export const animateIcons = status => ({
  type: TOGGLE_CONTACT_ICON_ANIMATION,
  payload: { status },
});

const animateItems = (side, status) => ({
  type: TOGGLE_CONTACT_ITEM_ANIMATION,
  payload: { [side.slice(8).toLowerCase()]: status },
});

export const animateLeftItems = animateItems.bind(null, CONTACT_LEFT);
export const animateRightItems = animateItems.bind(null, CONTACT_RIGHT);

export const changeEmailField = data => ({
  type: CHANGE_CONTACT_FIELD,
  payload: { ...data },
});

export const submitEmailReset = () => ({ type: SUBMIT_CONTACT_EMAIL_RESET });
export const submitEmailSuccess = () => ({ type: SUBMIT_CONTACT_EMAIL_SUCCESS });
export const submitEmailError = code => (
  (dispatch) => {
    const errorCode = Math.min(code, 500);
    dispatch({
      type: SUBMIT_CONTACT_EMAIL_ERROR,
      payload: { status: errorCode },
    });
    setTimeout(() => dispatch(submitEmailReset()), 4000);
  }
);

export const submitEmail = () => (dispatch, getState) => {
  dispatch({ type: SUBMIT_CONTACT_EMAIL_WAIT });
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
    return dispatch(submitEmailError(response.status));
  })
  .catch((error) => {
    console.error(error);
    return dispatch(submitEmailError());
  });
};

export const playAudio = () => ({ type: TOGGLE_AUDIO_PLAYBACK });

