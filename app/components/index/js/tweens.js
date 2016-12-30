const fadeStart = {opacity: 0}, fadeQuarter = {opacity: 0.25}, fadeHalf = {opacity: 0.5}, fadeEnd = {opacity: 1};

const header = {
  topBottom: {transform: 'translateY(-100%)', ...fadeStart},
  topCenter: {transform: 'translateY(0)', ...fadeEnd}
};


const home = {};

const about = {};

const affiliation = {};

const portfolio = {
  header,
  menu: (offset) => ({
    topBottom: {transform: 'translateY(100%', ...fadeStart},
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

const stats = {};

const pubs = {};

const contact = {};


export {home, about, affiliation, portfolio, skills, stats, pubs, contact};




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
//     about: {
//       header: headerTween(".ABOUT__header"),
//       spinIcon: KUTE.allFromTo(".ABOUT__icon",
//         {rotate: 360*2+45, ...fadeStart},
//         {rotate: 45,...fadeEnd},
//         {easing: 'easingElasticInOut', offset: 200, ...playOneSec})
//     },
//     affliation: {
//       header: headerTween(".AFFILIATION__header")
//     },
//     skills: {
//       header: headerTween(".SKLLLS__header"),
//     },
//     stats: {
//       header: headerTween(".STATS__header"),
//       filpCounter: KUTE.allFromTo(".STATS__counter", 
//         {rotateY: 360, scale: 0},
//         {rotateY: 0, scale: 1},
//         {offset: 200, delay: 500, ...playOneSec,
//           complete: () => { $(".STATS__text").addClass("done"); }}
//         ),
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
//       flipGithub: KUTE.fromTo(".STATS__github", 
//         {rotateY: 180, ...fadeQuarter},
//         {rotateY: 0, ...fadeEnd},
//         {easing: 'easingBackIn', ...playOneSec})
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
