var duration_1s = {duration: 1000}, reversable = {reversable: true};

function headerTween(target) {
    return KUTE.fromTo(target,
        {translateY: '-100%', opacity: 0},
        {translateY: 0, opacity: 1},
        Object.assign(reversable, duration_1s));
}

function blinkTween(selector) {
    KUTE.fromTo(selector, {opacity: 1}, {opacity: 0}, {duration: 200, repeat: 2, complete: function() { $(selector).remove(); }}).start();
}

var tweens = {
    home: {
        name: KUTE.fromTo("#img_name", 
            {scale: $(window).width() / 500, opacity: 0}, 
            {scale: 1, opacity: 1},
            {delay: 1000, duration: 1000}),
        typeWrite1: KUTE.to("#subtitle_1", {text: 'Full-Stack Web Developer'}, {delay: 2250, duration: 3000, complete: function() { blinkTween(".HOME__cursor"); }}),
        typeWrite2: KUTE.to("#subtitle_2", {text: 'RNA Biochemist & Automator'}, {delay: 5850, duration: 3200, complete: function() { blinkTween(".HOME__cursor"); }}),
        brighten: KUTE.to(".HOME__shade", {backgroundColor: 'rgba(0, 7, 11, 0.25)'}, Object.assign({delay: 9000}, duration_1s)),
        colorArrow: KUTE.fromTo(".HOME__scroll_down i", {color: '#fff'}, {color: '#9fc906'}, {repeat: Infinity, duration: 5000}),

        fadeTitle: KUTE.fromTo(".HOME__content", {opacity: 1}, {opacity: 0.5}, Object.assign(reversable, duration_1s)),
        fadeScroll: KUTE.fromTo(".HOME__scroll_down", {opacity: 0.5}, {opacity: 1}, Object.assign(reversable, duration_1s)),
    },
    about: {
        header: headerTween(".ABOUT__header"),
        spinIcon: KUTE.allFromTo(".ABOUT__icon",
            {rotate: 360*2+45, opacity: 0},
            {rotate: 45, opacity: 1},
            Object.assign({easing: 'easingElasticInOut', offset: 200}, duration_1s))
    },
    affliation: {
        header: headerTween(".AFFILIATION__header")
    },
    portfolio: {
        header: headerTween(".PORTFOLIO__header"),
        showThumbnail: KUTE.allFromTo(".PORTFOLIO__entry",
            {translateY: '100%', scale: 2, opacity: 0},
            {translateY: 0, scale: 1, opacity: 1},
            Object.assign({easing: 'easingElasticInOut', offset: 200, delay: 500}, duration_1s))
    },
    skills: {
        header: headerTween(".SKLLLS__header"),
        showProgressLeft: KUTE.allFromTo(".SKILLS__progress.left",
            {translateX: '-150%', scale: 2, opacity: 0.25},
            {translateX: 0, scale: 1, opacity: 1},
            Object.assign({easing: 'easingBackIn', offset: 100}, duration_1s)),
        showProgressRight: KUTE.allFromTo(".SKILLS__progress.right",
            {translateX: '150%', scale: 2, opacity: 0.25},
            {translateX: 0, scale: 1, opacity: 1},
            Object.assign({easing: 'easingBackIn', offset: 100}, duration_1s))
    },
    stats: {
        header: headerTween(".STATS__header"),
        filpCounter: KUTE.allFromTo(".STATS__counter", 
            {rotateY: 360, scale: 0},
            {rotateY: 0, scale: 1},
            Object.assign({offset: 200, delay: 500, complete: function() { $(".STATS__text").addClass("done"); }}, duration_1s)),
        countUp: {
            project: KUTE.fromTo("#STATS__counter_1",
                {number: 0},
                {number: count_to.project},
                {delay: 700, duration: 1500}),
            code: KUTE.fromTo("#STATS__counter_2",
                {number: 0},
                {number: count_to.code},
                {delay: 900, duration: 2500}),
            publication: KUTE.fromTo("#STATS__counter_3",
                {number: 0},
                {number: count_to.publication},
                {delay: 1100, duration: 1500}),
            scholarship: KUTE.fromTo("#STATS__counter_4",
                {number: 0},
                {number: count_to.scholarship},
                {delay: 1300, duration: 1500})
        },
        flipGithub: KUTE.fromTo(".STATS__github", 
            {rotateY: 180, opacity: 0.25},
            {rotateY: 0, opacity: 1},
            Object.assign({easing: 'easingBackIn'}, duration_1s))
    },
    pubs: {
        header: headerTween(".PUBS__header"),
        flipEntry: KUTE.allFromTo(".PUBS__entry",
            {rotateX: 180, opacity: 0.25},
            {rotateX: 0, opacity: 1},
            Object.assign({delay: 1000, offset: 200}, duration_1s)),
        flipYear: KUTE.allFromTo(".PUBS__year",
            {rotateX: 180, opacity: 0.25},
            {rotateX: 0, opacity: 1},
            Object.assign({delay: 500, offset: 200}, duration_1s))
    },
    contact: {
        header: headerTween(".CONTACT__header"),
        flipIcon: KUTE.allFromTo(".CONTACT__icon",
            {rotateX: 0, opacity: 0.25},
            {rotateX: 360, opacity: 1},
            Object.assign({delay: 200, offset: 200, easing: 'easingElasticOut'}, duration_1s)),
        rotateIcon: KUTE.allFromTo(".CONTACT__icon",
            {rotate: 0, opacity: 1},
            {rotate: 45, opacity: 1},
            {delay: 1200, offset: 200, easing: 'easingElasticOut', duration: 200}),
        showListLeft: KUTE.allFromTo(".CONTACT__address li",
            {translateX: '-100%', translateY: '100%', opacity: 0.25},
            {translateX: 0, translateY: 0, opacity: 1},
            Object.assign({delay: 500, offset: 100}, duration_1s)),
        showFormRight: KUTE.allFromTo(".CONTACT__form .form-group",
            {translateX: '100%', translateY: '100%', opacity: 0.25},
            {translateX: 0, translateY: 0, opacity: 1},
            Object.assign({delay: 500, offset: 100}, duration_1s))
    },
    footer: KUTE.fromTo(".FOOTER__header", {translateY: '-100%', opacity: 0}, {translateY: 0, opacity: 1}, duration_1s)

};

