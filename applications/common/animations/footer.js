import { easeInOutCirc } from '../animations/easing.js';


export const footerHeader = {
  keyframes: [
    { transform: 'translateY(-100%)', opacity: 0 },
    { transform: 'translate(0)', opacity: 1 },
  ],
  timing: {
    delay: 750,
    duration: 1250,
    easing: easeInOutCirc,
  },
};

export const footerGif = {
  keyframes: [
    { opacity: 0 },
    { opacity: 1 },
  ],
  timing: {
    delay: 500,
    duration: 1000,
    easing: easeInOutCirc,
  },
};
