const func = {
  countTo: (valFrom, valTo, duration, setState) => {
    let valNow = valFrom;
    let loopNow = 0;
    const loops = Math.ceil(duration / 100);
    const increment = (valTo - valFrom) / loops;

    const interval = setInterval(() => {
      valNow += increment;
      loopNow += 1;
      setState({
        value: valNow,
        status: 'counting',
      });

      if (loopNow === loops) {
        clearInterval(interval);
        setState({
          value: valTo,
          status: 'complete',
        });
      }
    }, 100);
  },
  typeWrite: (valTo, state, setState) => (new Promise((resolve, reject) => {
    let valNow = '';
    let loopNow = 0;
    const loops = valTo.length;

    try {
      const interval = setInterval(() => {
        valNow = valTo.slice(0, loopNow);
        setState({
          ...state,
          title: valNow.replace(/!/g, '').replace(/@/g, '<br/>'),
        });
        loopNow += 1;

        if (loopNow === loops + 1) {
          clearInterval(interval);
          resolve(1);
        }
      }, 100);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  })),
  delay: (time, callback) => (new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (typeof callback === 'function') { callback(); }
        resolve();
      }, time);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  })),
};


const fadeStart = { opacity: 0 };
const fadeQuarter = { opacity: 0.25 };
const fadeHalf = { opacity: 0.5 };
const fadeEnd = { opacity: 1 };

const header = {
  topBottom: {
    transform: 'translateY(-100%)',
    ...fadeStart,
  },
  topCenter: {
    transform: 'translateY(0)',
    ...fadeEnd,
  },
};


const home = {
  name: {
    start: {
      transform: 'scale(5)',
      ...fadeStart,
    },
    end: {
      transform: 'scale(1)',
      ...fadeEnd,
    },
  },
  title: (state, title, setState) => (new Promise((resolve, reject) => {
    try {
      if (!state.isPlayed) {
        setState({
          ...state,
          isPlayed: true,
        });

        func.delay(1600)
        .then(() => func.typeWrite(title, state, setState))
        .then(() => {
          func.delay(600, () => setState({
            ...state,
            isBlink: false,
          }));
          return func.delay(1000);
        })
        .then(() => {
          setState({
            ...state,
            isShade: false,
          });
          resolve();
        });
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  })),
  color: (state, setState) => {
    const textClassNames = ['white', 'light-green', 'green', 'dark-green', 'green', 'light-green'];
    let count = 0;

    setInterval(() => {
      setState({
        ...state,
        textColor: textClassNames[count],
        arrowColor: (state.arrowColor === 'white') ? 'light-green' : 'white',
      });
      count = (count + 1) % 6;
    }, 2000);
  },
  fade: {
    bottomBottom: {
      transform: 'translateY(0px)',
      ...fadeEnd,
    },
    bottomCenter: {
      transform: 'translateY(-100px)',
      ...fadeHalf,
    },
  },
};

const affiliation = { header };

const stats = {
  header,
  counter: offset => ({
    centerBottom: {
      transform: 'rotateY(360deg) scale(0)',
    },
    [`bottomBottom+${offset}`]: {
      transform: 'rotateY(0deg) scale(1)',
    },
  }),
  git: {
    ease: 'easeInBack',
    centerBottom: {
      transform: 'rotateY(180deg)',
      ...fadeQuarter,
    },
    'bottomPct+75': {
      transform: 'rotateY(0deg)',
      ...fadeEnd,
    },
  },
};

const pubs = {
  header,
  year: {
    bottomBottom: {
      transform: 'rotateX(180deg)',
      ...fadeQuarter,
    },
    'bottomPct+75': {
      transform: 'rotateX(0deg)',
      ...fadeEnd,
    },
  },
  entry: {
    topBottom: {
      transform: 'rotateX(180deg)',
      ...fadeQuarter,
    },
    'topPct+75': {
      transform: 'rotateX(0deg)',
      ...fadeEnd,
    },
  },
};

const contact = {
  header,
  icon: {
    ease: 'easeInOutBack',
    centerBottom: {
      transform: 'rotateX(360deg) rotate(-45deg)',
      ...fadeQuarter,
    },
    'bottomPct+75': {
      transform: 'rotateX(0deg) rotate(45deg)',
      ...fadeEnd,
    },
  },
  listLeft: {
    topBottom: {
      transform: 'translateX(-100%) translateY(100%)',
      ...fadeQuarter,
    },
    'topPct+75': {
      transform: 'translateX(0%) translateY(0%)',
      ...fadeEnd,
    },
  },
  formRight: {
    topBottom: {
      transform: 'translateX(100%) translateY(100%)',
      ...fadeQuarter,
    },
    'topPct+75': {
      transform: 'translateX(0%) translateY(0%)',
      ...fadeEnd,
    },
  },
};


export {
  home,
  affiliation,
  stats,
  pubs,
  contact,
  func,
};
