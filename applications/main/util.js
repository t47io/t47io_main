import {
  MARKUP,
  FIELD_MARKUP,
} from './constants/util.js';


export const fieldRegex = new RegExp(FIELD_MARKUP, 'g');
export const italicRegex = new RegExp(`${MARKUP}[a-zA-Z0-9]*${MARKUP}`, 'g');


export const delay = (time = 0, callback) => (
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (typeof callback === 'function') { callback(); }
        resolve();
      }, time);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  })
);
