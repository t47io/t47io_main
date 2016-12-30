const func = {
  countTo: (valFrom, valTo, duration, setState) => {
    let valNow = valFrom, loopNow = 0;
    const loops = Math.ceil(duration / 100);
    const increment = (valTo - valFrom) / loops;
    const interval = setInterval(() => {
      valNow += increment;
      loopNow += 1
      setState({value: valNow, status: "counting"});

      if (loopNow == loops) {
        clearInterval(interval);
        setState({value: valTo, status: "complete"});
      }
    }, 100);
  },
  onUp: () => {
    console.log('up')
  },
  onDown: () => {
    console.log('down')
  }
};


const fadeStart = {opacity: 0}, fadeQuarter = {opacity: 0.25}, fadeHalf = {opacity: 0.5}, fadeEnd = {opacity: 1};

const header = {
  topBottom: {transform: 'translateY(-100%)', ...fadeStart},
  topCenter: {transform: 'translateY(0)', ...fadeEnd}
};


const home = {};

const about = {
  header,
  icon: (offset) => ({
    ease: 'bouncePast',
    topBottom: {transform: 'rotate(720deg)', ...fadeStart},
    [`bottomBottom+${offset}`]: {transform: 'rotate(45deg)', ...fadeEnd}
  })
};

const affiliation = {header};

const portfolio = {
  header,
  menu: (offset) => ({
    topBottom: {transform: 'translateY(100%)', ...fadeStart},
    [`bottomBottom+${offset}`]: {transform: 'translateY(0%)', ...fadeEnd}
  }),
  thumbnail: {
    ease: 'bouncePast',
    topBottom: {transform: 'translateY(100%) scale(2)'},
    bottomBottom: {transform: 'translateY(0%) scale(1)'}
  }
};

const skills = {
  header,
  progressLeft: {
    ease: 'easeInBack',
    topBottom: {transform: 'translateX(-150%) scale(2)', ...fadeQuarter},
    topCenter: {transform: 'translateX(0%) scale(1)', ...fadeEnd}
  },
  progressRight: {
    ease: 'easeInBack',
    topBottom: {transform: 'translateX(150%) scale(2)', ...fadeQuarter},
    topCenter: {transform: 'translateX(0%) scale(1)', ...fadeEnd}
  }
};

const stats = {
  header,
  counter: (offset) => ({
    topBottom: {transform: 'rotateY(360deg) scale(0)'},
    [`bottomBottom+${offset}`]: {transform: 'rotateY(0deg) scale(1)'}
  }),
  git: {
    ease: 'easeInBack',
    topBottom: {transform: 'rotateY(180deg)', ...fadeQuarter},
    bottomBottom: {transform: 'rotateY(0deg)', ...fadeEnd}
  }
};

const pubs = {};

const contact = {};


export {home, about, affiliation, portfolio, skills, stats, pubs, contact, func};




// const headerTween = (target) => (
//   KUTE.fromTo(target,
//     {translateY: '-100%', ...fadeStart},
//     {translateY: 0, ...fadeEnd},
//     {...reversable, ...playOneSec})
// );

// const blinkTween = (selector) => (
//     KUTE.fromTo(selector,
//       fadeEnd, fadeStart,
//       {duration: 200, repeat: 2,
//         complete: () => { $(selector).remove(); }
//       })
//     .start()
// );

// const tweens = {
//     home: {
//       name: KUTE.fromTo("#img_name", 
//         {scale: $(window).width() / 500, ...fadeStart}, 
//         {scale: 1, ...fadeEnd},
//         {delay: 1000, ...playOneSec}),
//       typeWrite1: KUTE.to("#subtitle_1",
//         {text: 'Full-Stack Web Developer'},
//         {delay: 2250, duration: 3000,
//           complete: () => { blinkTween(".HOME__cursor"); }}
//         ),
//       typeWrite2: KUTE.to("#subtitle_2",
//         {text: 'RNA Biochemist & Automator'},
//         {delay: 5850, duration: 3200,
//           complete: () => { blinkTween(".HOME__cursor"); }}
//         ),
//       brighten: KUTE.to(".HOME__shade",
//         {backgroundColor: 'rgba(0, 7, 11, 0.25)'},
//         {delay: 9000, ...playOneSec}),
//       colorArrow: KUTE.fromTo(".HOME__scroll_down i",
//         {color: '#fff'},
//         {color: '#9fc906'},
//         {repeat: Infinity, duration: 5000}),
//       fadeTitle: KUTE.fromTo(".HOME__content",
//         fadeEnd,
//         fadeHalf,
//         {...reversable, ...playOneSec}),
//       fadeScroll: KUTE.fromTo(".HOME__scroll_down",
//         fadeHalf,
//         fadeEnd,
//         {...reversable, ...playOneSec})
//     },
//     stats: {
//       countUp: {
//         project: KUTE.fromTo("#STATS__counter_1",
//           {number: 0},
//           {number: $("#STATS__counter_1").text()},
//           {delay: 700, duration: 1500}),
//         code: KUTE.fromTo("#STATS__counter_2",
//           {number: 0},
//           {number: $("#STATS__counter_2").text()},
//           {delay: 900, duration: 2500}),
//         publication: KUTE.fromTo("#STATS__counter_3",
//           {number: 0},
//           {number: $("#STATS__counter_3").text()},
//           {delay: 1100, duration: 1500}),
//         scholarship: KUTE.fromTo("#STATS__counter_4",
//           {number: 0},
//           {number: $("#STATS__counter_4").text()},
//           {delay: 1300, duration: 1500})
//       },
//     },
//     pubs: {
//       header: headerTween(".PUBS__header"),
//       flipEntry: KUTE.allFromTo(".PUBS__entry",
//         {rotateX: 180, ...fadeQuarter},
//         {rotateX: 0, ...fadeEnd},
//         {delay: 1000, offset: 200, ...playOneSec}),
//       flipYear: KUTE.allFromTo(".PUBS__year",
//         {rotateX: 180, ...fadeQuarter},
//         {rotateX: 0, ...fadeEnd},
//         {delay: 500, offset: 200, ...playOneSec})
//     },
//     contact: {
//       header: headerTween(".CONTACT__header"),
//       flipIcon: KUTE.allFromTo(".CONTACT__icon",
//         {rotateX: 0, ...fadeQuarter},
//         {rotateX: 360, ...fadeEnd},
//         {delay: 200, offset: 200, easing: 'easingElasticOut', ...playOneSec}),
//       rotateIcon: KUTE.allFromTo(".CONTACT__icon",
//         {rotate: 0, ...fadeQuarter},
//         {rotate: 45, ...fadeEnd},
//         {delay: 1200, offset: 200, easing: 'easingElasticOut', duration: 200}),
//       showListLeft: KUTE.allFromTo(".CONTACT__address li",
//         {translateX: '-100%', translateY: '100%', ...fadeQuarter},
//         {translateX: 0, translateY: 0, ...fadeEnd},
//         {delay: 500, offset: 100, ...playOneSec}),
//       showFormRight: KUTE.allFromTo(".CONTACT__form .form-group",
//         {translateX: '100%', translateY: '100%', ...fadeQuarter},
//         {translateX: 0, translateY: 0, ...fadeEnd},
//         {delay: 500, offset: 100, ...playOneSec})
//     },
//     footer: KUTE.fromTo(".FOOTER__header",
//       {translateY: '-100%', ...fadeStart},
//       {translateY: 0, ...fadeEnd},
//       playOneSec)

// };


// export default tweens;