import { easeOutBack } from '../../common/animations/easing.js';


export const contactItem = {
  keyframes: [
    { transform: 'rotateX(180deg) rotateZ(180deg)', opacity: 0 },
    { transform: 'rotateX(0) rotateZ(0deg)' },
    { transform: 'rotateX(180deg) rotateZ(90deg)' },
    { transform: 'rotate(0)', opacity: 1 },
  ],
  timing: index => ({
    delay: index * 250,
    duration: 500,
    easing: easeOutBack,
  }),
};

export const contactList = {
  keyframes: [
    { transform: 'translateX(-100%) translateY(100%)', opacity: 0 },
    { transform: 'translate(0)', opacity: 1 },
  ],
  timing: index => ({
    delay: 1250 + index * 125,
    duration: 500,
    easing: 'linear',
  }),
};

export const contactForm = {
  keyframes: [
    { transform: 'translateX(100%) translateY(100%)', opacity: 0 },
    { transform: 'translate(0)', opacity: 1 },
  ],
  timing: index => ({
    delay: 1250 + index * 125,
    duration: 500,
    easing: 'linear',
  }),
};
