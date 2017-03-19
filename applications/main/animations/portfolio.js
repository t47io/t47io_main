import { easeInOutBack } from '../../common/animations/easing.js';


export const portfolioItem = {
  keyframes: [
    { transform: 'translateY(100%) scale(2.5)', opacity: 0 },
    { transform: 'translate(0) scale(1)', opacity: 1 },
  ],
  timing: index => ({
    delay: index * 125,
    duration: 500,
    easing: easeInOutBack,
    fill: 'both',
  }),
};

export const portfolioFilterItem = {
  keyframes: [
    { transform: 'translateY(100%)', opacity: 0 },
    { transform: 'translate(0)', opacity: 1 },
  ],
  timing: index => ({
    delay: index * 125,
    duration: 250,
    easing: 'linear',
    fill: 'both',
  }),
};
