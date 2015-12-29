$(window).load(function() {
    $(".page-loader").fadeOut("slow");
});


$(document).ready(function() {
    var controller = new $.ScrollMagic.Controller({
        'globalSceneOptions': {'triggerHook': 'onEnter', }
    });
    $("section").each(function() {
        if ($(this).attr('id') == 'contact-section') {
            new ScrollMagic.Scene({'triggerElement': "#contact-trigger", 'triggerHook': 'onLeave', 'duration': 100})
            .setTween(TweenMax.fromTo("#contact-section", 1, {'y': '100%'}, {'y': '0%'}))
            .addIndicators()
            .addTo(controller);
        } else {
            new ScrollMagic.Scene({'triggerElement': $(this)})
            .addTo(controller);
        }
    });

    new TweenMax.from("#caption > h1", 1, {'scale': 5, 'opacity': 0, 'delay': 1});
    new TweenMax.staggerFrom("#caption > p", 1, {'y': '100%', 'opacity': 0, 'delay': 2.25}, 0.5);

    new ScrollMagic.Scene({'triggerElement': '#about-section', 'duration': $(window).height() - $("#main-navbar").height()})
    .setTween(TweenMax.fromTo("#caption", 1, {'opacity': 1}, {'y': ($(window).height() - $("#caption").height()) / 2, 'opacity': 0.5}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#about-section', 'duration': '100%'})
    .setTween(TweenMax.from("#about-header", 1, {'y': '-100%', 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#about-section', 'offset': '300%'})
    .setTween(TweenMax.staggerFrom(".rotate-box-2.square-icon > .rotate-box-icon", 1, {'rotation': 360*2, 'opacity': 0.25, 'ease':Bounce.easeOut}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '.stanford', 'duration': '100%'})
    .setTween(TweenMax.from("#stanford-header", 1, {'y': '-100%', 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#portfolio-section', 'duration': '100%'})
    .setTween(TweenMax.from("#work-header", 1, {'y': '-100%', 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#portfolio', 'duration': 1000})
    .setTween(TweenMax.staggerFrom(".portfolio_single_content", 1, {'y': '100%', 'opacity': 0, 'scale': 2, 'ease':Elastic.easeInOut}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#skill-trigger', 'duration': '100%'})
    .setTween(TweenMax.from("#skill-header", 1, {'y': '-100%', 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#skill-trigger', 'offset': '100%'})
    .setTween(TweenMax.staggerFrom(".skill-bar.left", 1, {'x': '-150%', 'opacity': 0.25, 'scale': 2, 'ease': Back.easeIn}, 0.2))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#skill-trigger', 'offset': '100%'})
    .setTween(TweenMax.staggerFrom(".skill-bar.right", 1, {'x': '150%', 'opacity': 0.25, 'scale': 2, 'ease': Back.easeIn}, 0.5))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#stat-trigger', 'duration': '100%', 'offset': '100%'})
    .setTween(TweenMax.from("#stat-header", 1, {'y': '-100%', 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#counter-trigger', 'offset': '100%'})
    .setTween(TweenMax.staggerFrom(".fact-inner", 1, {'rotationY': 360, 'scale': 0}, 0.2))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#counter-trigger', 'offset': '300%'})
    .on('start', function() {
        $("div.fact-inner > p.lead").removeClass('counter-finish');
        setTimeout(function() {
            $("#count_num_1").countTo({
                'from': 0, 'to': 500, 'speed': 2000,
                'onComplete': function() { $(this).next().addClass('counter-finish'); }
            });
        }, 0);
        setTimeout(function() {
            $("#count_num_2").countTo({
                'from': 0, 'to': 500, 'speed': 2000,
                'onComplete': function() { $(this).next().addClass('counter-finish'); }
            });
        }, 200);
        setTimeout(function() {
            $("#count_num_3").countTo({
                'from': 0, 'to': 500, 'speed': 2000,
                'onComplete': function() { $(this).next().addClass('counter-finish'); }
            });
        }, 400);
        setTimeout(function() {
            $("#count_num_4").countTo({
                'from': 0, 'to': 500, 'speed': 2000,
                'onComplete': function() { $(this).next().addClass('counter-finish'); }
            });
        }, 600);
    })
    .addTo(controller);    new ScrollMagic.Scene({'triggerElement': '#contact-section', 'duration': '100%'})
    .setTween(TweenMax.from("#contact-header", 1, {'y': '-100%', 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#contact-section', 'offset': '200%'})
    .setTween(TweenMax.staggerFrom(".rotate-box-1.square-icon > .rotate-box-icon", 1, {'rotationX': 360, 'opacity': 0.25}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#contact-section', 'offset': $("#contact-section").height()})
    .setTween(TweenMax.staggerFrom(".contact-info > h4, .contact-address > li", 1, {'x': '-100%', 'y': '100%', 'opacity': 0.25}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#contact-section', 'offset': $("#contact-section").height()})
    .setTween(TweenMax.staggerFrom(".contact-form > h4, .contact-form > form > *", 1, {'x': '100%', 'y': '100%', 'opacity': 0.25}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': 'footer'})
    .setTween(TweenMax.from("#footer-header", 2, {'y': '-100%', 'opacity': 0}))
    .addTo(controller);



    $(".rotate-box-2.square-icon").on('click', function(event) { event.preventDefault(); });
    $(".portfolio_single_content").each(function() {
        $(this).css('height', $("img", this).css('height'));
    });

    $("#home").parallax();
    
});


$(window).scroll(function() {
    if ($(window).scrollTop() > $(window).height() / 2 + $("#caption").height()) {
        $('.scrolltotop').fadeIn();
        $('.navbar-fixed-top').addClass('navbar-shrink navbar-default').removeClass('navbar-transparent');
    } else {
        $('.scrolltotop').fadeOut();
        $('.navbar-fixed-top').removeClass('navbar-shrink navbar-default').addClass('navbar-transparent');
    }
});

$('.scrolltotop').on('click', function(event) {
    $('html, body').animate({scrollTop : 0}, 1000, 'easeInOutExpo');
    event.preventDefault();
});

$('.page-scroll').bind('click', function(event) {
    $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - 64
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
});

$('body').scrollspy({
    target: '.navbar',
    offset: 65
});


$(document).on('click', '.navbar-collapse.in', function(event) {
    if( $(event.target).is('a') && $(event.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});
