$(window).load(function() {
    $(".page-loader").fadeOut("slow");
});

var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
        header = $('.navbar-fixed-top'),
        didScroll = false,
        changeHeaderOn = 10;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            header.addClass('navbar-shrink navbar-default').removeClass('navbar-transparent');
        }
        else {
            header.removeClass('navbar-shrink navbar-default').addClass('navbar-transparent');
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();


// $.stellar({
//     horizontalScrolling: false,
//     verticalScrolling: true,
//     parallaxBackgrounds: true,
//     parallaxElements: true,
// });

$(document).ready(function() {
    var controller = new $.ScrollMagic.Controller({
        'globalSceneOptions': {'triggerHook': 'onEnter', }
    });
    var slides = $("section");
    for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        new ScrollMagic.Scene({ 'triggerElement': slide, })
        .addTo(controller);
    }

    new ScrollMagic.Scene({'triggerElement': slides[1], 'duration': 500})
    .setTween(TweenMax.to("#caption", 1, {'y': 300}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': slides[1], 'duration': 500})
    .setTween(TweenMax.to("#caption", 1, {'opacity': 0.5, 'ease':Expo.easeIn}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': slides[1], 'duration': 500})
    .setTween(TweenMax.from("#about-header", 1, {'y': -200, 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': slides[1], 'offset': 300})
    .setTween(TweenMax.staggerFrom(".rotate-box-2.square-icon > .rotate-box-icon", 1, {'rotation': 360*2, 'opacity': 0.25, 'ease':Bounce.easeOut}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '.stanford', 'duration': 500})
    .setTween(TweenMax.from("#stanford-header", 1, {'y': -200, 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': slides[2], 'duration': 500})
    .setTween(TweenMax.from("#work-header", 1, {'y': -200, 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#portfolio', 'duration': 1250})
    .setTween(TweenMax.staggerFrom(".portfolio_single_content", 1, {'y': 100, 'opacity': 0, 'scale': 2, 'ease':Elastic.easeInOut}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#skill-trigger', 'duration': 500})
    .setTween(TweenMax.from("#skill-header", 1, {'y': -200, 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#skill-trigger', 'offset': 300})
    .setTween(TweenMax.staggerFrom(".skill-bar.left", 1, {'x': -800, 'opacity': 0.25, 'scale': 2, 'ease': Back.easeIn}, 0.2))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#skill-trigger', 'offset': 300})
    .setTween(TweenMax.staggerFrom(".skill-bar.right", 1, {'x': 800, 'opacity': 0.25, 'scale': 2, 'ease': Back.easeIn}, 0.5))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#stat-trigger', 'duration': 500, 'offset': 300})
    .setTween(TweenMax.from("#stat-header", 1, {'y': -200, 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': '#counter-trigger', 'offset': 300})
    .setTween(TweenMax.staggerFrom(".fact-inner", 1, {'rotationY': 360, 'scale': 0}, 0.2))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': slides[3], 'duration': 500})
    .setTween(TweenMax.from("#contact-header", 1, {'y': -200, 'opacity': 0}))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': slides[3], 'offset': 300})
    .setTween(TweenMax.staggerFrom(".rotate-box-1.square-icon > .rotate-box-icon", 1, {'rotationX': 360, 'opacity': 0.25, 'ease':Expo.easeOut}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': slides[3], 'offset': 500})
    .setTween(TweenMax.staggerFrom(".contact-info > h4, .contact-address > li", 1, {'x': -300, 'y': 300, 'opacity': 0.25}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': slides[3], 'offset': 500})
    .setTween(TweenMax.staggerFrom(".contact-form > h4, .contact-form > form > *", 1, {'x': 300, 'y': 300, 'opacity': 0.25}, 0.1))
    .addTo(controller);
    new ScrollMagic.Scene({'triggerElement': 'footer'})
    .setTween(TweenMax.from("#footer-header", 2, {'y': -50, 'opacity': 0}))
    .addTo(controller);




    $(".rotate-box-2.square-icon").on('click', function(event) { event.preventDefault(); });
    $(".portfolio_single_content").each(function() {
        $(this).css('height', $("img", this).css('height'));
    });

});


// new WOW().init();

// $('.counter').counterUp({
//     delay: 10,
//     time: 2000
// });


$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.scrolltotop').fadeIn();
    } else {
        $('.scrolltotop').fadeOut();
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
