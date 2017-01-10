const fadeStart = {opacity: 0}, fadeQuarter = {opacity: 0.25}, fadeHalf = {opacity: 0.5}, fadeEnd = {opacity: 1};


const footer = {
  header: {
    ease: 'easeInOutCirc',
    topBottom: {transform: 'translateY(-100%)', ...fadeStart},
    bottomBottom: {transform: 'translateY(0%)', ...fadeEnd}
  },
  gif: {
    ease: 'easeOutQuint',
    centerBottom: fadeStart,
    bottomBottom: fadeEnd
  }
};


export {footer};
