var duration_1s = {duration: 1000}, reversable = {reversable: true};

function headerTween(target) {
    return KUTE.fromTo(target,
        {translateY: '-100%', opacity: 0},
        {translateY: 0, opacity: 1},
        Object.assign(reversable, duration_1s));
}

var tweens = {
    home: {
        name: KUTE.fromTo("#img_name", 
            {scale: $(window).width() / 500, opacity: 0}, 
            {scale: 1, opacity: 1},
            {delay: 1500, duration: 1000,
            'complete': function() {
                setInterval(function() {
                    $(".scrollDown > i.fa").removeClass(arrow_class[arrow_timer]);
                    arrow_timer += 1;
                    if (arrow_timer == 2) { arrow_timer = 0; }
                    $(".scrollDown > i.fa").addClass(arrow_class[arrow_timer]);
                }, 2000);

                setTimeout(function() {
                    $("#subtitle_1").typewrite({
                        delay: 80, 'extra_char': '<b class="blink_cursor">|</b>', 'trim': true,
                        'callback': function () {
                            setTimeout(function() {
                                $("b.blink_cursor").remove();
                                $("#subtitle_2").typewrite({
                                    delay: 80, 'extra_char': '<b class="blink_cursor">|</b>', 'trim': true,
                                    'callback': function () {
                                        setTimeout(function() {
                                            $("b.blink_cursor").remove();
                                            $("#home-section > div.cover").css('background-color', 'rgba(0, 7, 11, 0.25)');
                                        }, 500);
                                        setInterval(function() {
                                            $("#caption > p").removeClass(cap_class[cap_timer]);
                                            cap_timer += 1;
                                            if (cap_timer == 6) { cap_timer = 0; }
                                            $("#caption > p").addClass(cap_class[cap_timer]);
                                        }, 2000);
                                    }
                                });
                            }, 500);
                        }
                    });
                }, 500);
            }
        }),
        fade: KUTE.fromTo("#caption", {opacity: 1}, {opacity: 0.5}, Object.assign(reversable, duration_1s)),
        arrow: KUTE.fromTo(".scrollDown", {opacity: 0.5}, {opacity: 1}, Object.assign(reversable, duration_1s)),
    },
    about: {
        header: headerTween(".ABOUT__header"),
        spinIcon: KUTE.allFromTo(".ABOUT__icon",
            {rotate: 360*2+45, opacity: 0},
            {rotate: 45, opacity: 1},
            Object.assign({easing: 'easingElasticInOut', offset: 200}, duration_1s))
    },
    affliation: {
        header: headerTween("#h_stanford")
    },
    portfolio: {
        project: {
            header: headerTween("#h_project"),
            showThumbnail: KUTE.allFromTo(".portfolio_single_content",
                {translateY: '100%', scale: 2, opacity: 0},
                {translateY: 0, scale: 1, opacity: 1},
                Object.assign({easing: 'easingElasticInOut', offset: 200, delay: 500}, duration_1s))
        },
        skill: {
            header: headerTween("#h_skill"),
            showProgressLeft: KUTE.allFromTo(".progress.left",
                {translateX: '-150%', scale: 2, opacity: 0.25},
                {translateX: 0, scale: 1, opacity: 1},
                Object.assign({easing: 'easingBackIn', offset: 100}, duration_1s)),
            showProgressRight: KUTE.allFromTo(".progress.right",
                {translateX: '150%', scale: 2, opacity: 0.25},
                {translateX: 0, scale: 1, opacity: 1},
                Object.assign({easing: 'easingBackIn', offset: 100}, duration_1s))
        },
        stats: {
            header: headerTween("#h_stat"),
            filpCounter: KUTE.allFromTo(".fact-inner", 
                {rotateY: 360, scale: 0},
                {rotateY: 0, scale: 1},
                Object.assign({offset: 200, delay: 500}, duration_1s)),
            countUp: {
                project: KUTE.to("#count_num_1",
                    {number: count_to.project},
                    {delay: 200, duration: 1500}),
                code: KUTE.to("#count_num_2",
                    {number: count_to.code},
                    {delay: 400, duration: 1500}),
                publication: KUTE.to("#count_num_3",
                    {number: count_to.publication},
                    {delay: 600, duration: 1500}),
                scholarship: KUTE.to("#count_num_4",
                    {number: count_to.scholarship},
                    {delay: 800, duration: 1500})
            }
        },
        publication: {
            header: headerTween("#h_pub"),
            flipEntry: KUTE.allFromTo(".pub_row",
                {rotateX: 180, opacity: 0.25},
                {rotateX: 0, opacity: 1},
                Object.assign({delay: 1000, offset: 200}, duration_1s)),
            flipYear: KUTE.allFromTo(".pub-year",
                {rotateX: 180, opacity: 0.25},
                {rotateX: 0, opacity: 1},
                Object.assign({delay: 500, offset: 200}, duration_1s))
        }
    },
    contact: {
        header: headerTween("#h_contact"),
        flipIcon: KUTE.allFromTo(".rotate-box-1 .rotate-box-icon",
            {rotateX: 360+45, opacity: 0.25},
            {rotateX: 45, opacity: 1},
            Object.assign({delay: 200, offset: 200}, duration_1s)),
        showTitleLeft: KUTE.fromTo(".contact-address li",
            {translateX: '-100%', translateY: '100%', opacity: 0.25},
            {translateX: 0, translateY: 0, opacity: 1},
            Object.assign({delay: 500, offset: 100}, duration_1s)),

    }

};

