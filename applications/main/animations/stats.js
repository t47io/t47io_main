import { easeInBack } from '../../common/animations/easing.js';


export const statsItem = {
  keyframes: [
    { transform: 'rotateY(180deg) scale(0)', opacity: 0 },
    { transform: 'rotateY(0)' },
    { transform: 'rotateY(-180deg)' },
    { transform: 'rotate(0) scale(1)', opacity: 1 },
  ],
  timing: index => ({
    delay: index * 250,
    duration: 500,
    easing: 'linear',
    fill: 'both',
  }),
};

export const statsGithub = {
  keyframes: [
    { transform: 'rotateY(180deg) scale(2)', opacity: 0.25 },
    { transform: 'rotate(0) scale(1)', opacity: 1 },
  ],
  timing: {
    duration: 750,
    easing: easeInBack,
    fill: 'both',
  },
};
