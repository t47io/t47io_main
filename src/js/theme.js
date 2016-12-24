function img_preload(img_array) {
    for (var i = 0; i < img_array.length; i++) {
        var img = new Image();
        img.src = img_array[i];
        // img.onload = function() { 
        //     var percent = parseInt($("#load-progress").attr('aria-valuenow'));
        //     percent += 5;
        //     $("#load-progress").attr('aria-valuenow', percent);
        //     $("#load-progress").css('width', percent + '%');
        // };
    }
}

var utilTweenList = Object.getPrototypeOf(KUTE.allTo("body", {}, {}));

function flattenTweens(tweenList) {
    tweenList = tweenList.map(function(tween) { return tween.tweens || tween; })
    return [].concat.apply([], tweenList);
}

function chainTweens(tweenList) {
    if (tweenList.length === 1) {
        return tweenList[0];
    } else {
        var obj = {tweens: tweenList};
        Object.setPrototypeOf(obj, utilTweenList);
        return obj;
    }
}

function addScene(trigger, offset, tweenList, controller) {
    offset = offset < 1 ? offset * $(trigger).height() : offset
    tweenList = flattenTweens(tweenList);
    var tweenReverse = tweenList.filter(function(tween) { return tween.options.hasOwnProperty('reverse'); });
    tweenReverse = tweenReverse.map(function(tween) { return tween.reverse(); });
    tweenList = chainTweens(tweenList);
    tweenReverse = chainTweens(tweenReverse);
    new ScrollMagic.Scene({
        triggerElement: trigger,
        offset: offset
    }).on('enter', function() { tweenList.start(); })
    .on('leave', function() { tweenReverse.start(); })
    .addTo(controller);
}


var cap_timer = 0, cap_class = ['text-white', 'text-light-green', 'text-green', 'text-dark-green', 'text-green', 'text-light-green'];
var arrow_timer = 0, arrow_class = ['text-white', 'text-light-green'];
var bio_timer = 0, bio_bg_imgs = ['/img/background/hover_tower.jpg', '/img/background/yosemite.jpg', '/img/background/lksc_building.jpg', '/img/background/big_sur.jpg', '/img/background/golden_gate.jpg'];
var stat_timer = 0, stat_bg_imgs = ['/img/background/fish_necklace.jpg', '/img/background/lawn_bench.jpg', '/img/background/cliff_reed.jpg', '/img/background/flower.jpg', '/img/background/tunnel.jpg'];
var contact_timer = 0, contact_bg_imgs = ['/img/background/campus_map.jpg', '/img/background/muir_trees.jpg', '/img/background/red_papercut.jpg', '/img/background/succulent.jpg', '/img/background/nano_dna.jpg'];

$("#stanford-carousel").parent().css('background-image', "url('" + bio_bg_imgs[0] + "')");
$("#stat-carousel").parent().css('background-image', "url('" + stat_bg_imgs[0] + "')");
$("#contact-carousel").parent().css('background-image', "url('" + contact_bg_imgs[0] + "')");


$(window).on('load', function() {
    $(".page-loader").fadeOut('slow');

    var controller = new $.ScrollMagic.Controller({
        globalSceneOptions: {triggerHook: 'onEnter'},
        addIndicators: true
    });
    $("section").each(function() {
        // new ScrollMagic.Scene({'triggerElement': $(this)})
        // .addTo(controller);
    });


    // TweenLite.defaultOverwrite = false;
    tweens.home.name.start();

    addScene("#sec_about", 125, [tweens.home.fade, tweens.home.arrow], controller);
    addScene("#trg_about", 125, [tweens.about.intro.header, tweens.about.intro.spinIcon], controller);
    addScene("#trg_stanford", 125, [tweens.about.affliation.header], controller);
    addScene("#sec_portfolio", 125, [tweens.portfolio.project.header, tweens.portfolio.project.showThumbnail], controller);
    addScene("#trg_skill", 125, [tweens.portfolio.skill.header, tweens.portfolio.skill.showProgressLeft, tweens.portfolio.skill.showProgressRight], controller);
    // addScene("#h_skill", 256, [tweens.portfolio.skill.showProgressLeft, tweens.portfolio.skill.showProgressRight], [], controller);



    // new ScrollMagic.Scene({'triggerElement': '#stat-trigger', 'duration': '100%', 'offset': '100%'})
    // .setTween(TweenLite.from("#stat-header", 1, {'y': '-100%', 'opacity': 0}))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': '#counter-trigger', 'offset': '100%'})
    // .setTween(tl.staggerFrom(".fact-inner", 1, {'rotationY': 360, 'scale': 0}, 0.2))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': '#counter-trigger', 'offset': '300%'})
    // .on('start', function() {
    //     $("div.fact-inner > p.lead").removeClass('counter-finish');
    //     setTimeout(function() {
    //         $("#count_num_1").countTo({
    //             'from': 0, 'to': count_to.project, 'speed': 1500,
    //             'onComplete': function() { $(this).next().next().addClass('counter-finish'); }
    //         });
    //     }, 0);
    //     setTimeout(function() {
    //         $("#count_num_2").countTo({
    //             'from': 0, 'to': count_to.code, 'speed': 1500,
    //             'onComplete': function() { $(this).next().next().addClass('counter-finish'); }
    //         });
    //     }, 200);
    //     setTimeout(function() {
    //         $("#count_num_3").countTo({
    //             'from': 0, 'to': count_to.publication, 'speed': 1500,
    //             'onComplete': function() { $(this).next().next().addClass('counter-finish'); }
    //         });
    //     }, 400);
    //     setTimeout(function() {
    //         $("#count_num_4").countTo({
    //             'from': 0, 'to': count_to.scholarship, 'speed': 1500,
    //             'onComplete': function() { $(this).next().next().addClass('counter-finish'); }
    //         });
    //     }, 600);
    // })
    // .addTo(controller);

    // new ScrollMagic.Scene({'triggerElement': '#pub-trigger', 'duration': '100%'})
    // .setTween(TweenLite.from("#pub-header", 1, {'y': '-100%', 'opacity': 0}))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': '#pub-trigger', 'offset': '300%'})
    // .setTween(tl.staggerFrom("div.pub-body > div.row", 1, {'rotationX': 180, 'opacity': 0.25}, 0.2))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': '#pub-trigger', 'offset': '300%'})
    // .setTween(tl.staggerFrom("div.pub-year", 1, {'rotationX': 180, 'opacity': 0.25}, 0.2))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': '#contact-section', 'duration': '100%'})
    // .setTween(TweenLite.from("#contact-header", 1, {'y': '-100%', 'opacity': 0}))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': '#contact-section', 'offset': '200%'})
    // .setTween(tl.staggerFrom(".rotate-box-1.square-icon > .rotate-box-icon", 1, {'rotationX': 360, 'opacity': 0.25}, 0.1))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': '#contact-section', 'offset': $("#contact-section").height() * 0.75})
    // .setTween(tl.staggerFrom(".contact-info > h4, .contact-address > li", 1, {'x': '-100%', 'y': '100%', 'opacity': 0.25}, 0.1))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': '#contact-section', 'offset': $("#contact-section").height() * 0.75})
    // .setTween(tl.staggerFrom(".contact-form > h4, .contact-form > form > .form-group", 1, {'x': '100%', 'y': '100%', 'opacity': 0.25}, 0.1))
    // .addTo(controller);
    // new ScrollMagic.Scene({'triggerElement': 'footer'})
    // .setTween(TweenLite.from("#footer-header", 2, {'y': '-100%', 'opacity': 0}))
    // .addTo(controller);

    // $("#git_body").load('/git/contrib/', function() {
    //     $("#git_body > svg > g > g:not(#legend) > rect.day").each(function() {
    //         $(this).attr({
    //             'data-toggle': 'tooltip',
    //             'data-placement': 'top',
    //             'title': $(this).attr('data-count') + ' contribution(s) on ' + $(this).attr('data-date')
    //         });
    //     });
    //     $("#git_body > svg").css("overflow", "visible");
    //     $('[data-toggle="tooltip"]').tooltip({
    //         'placement': $(this).attr('data-placement'),
    //         'container': 'body'
    //     });
    // });
    // new ScrollMagic.Scene({'triggerElement': '#git-trigger', 'offset': '100%'})
    // .setTween(tl.staggerFrom("#git-trigger", 1, {'rotationY': 180, 'opacity': 0.25, 'ease': Back.easeIn}, 0.1))
    // .addTo(controller);


    $("#subtitle_0").css("width", $("#subtitle_1").css("width"));
    $(".rotate-box-2.square-icon").on('click', function(event) { event.preventDefault(); });
    // $(".portfolio_single_content > div > a").on('click', function(event) { event.preventDefault(); });
    $(".portfolio_single_content").each(function() {
        $(this).css('height', $("img", this).css('height'));
        $(this).on('click', function() {
            window.open($("a", this).attr('href'), '_blank');
        });
    });
    $(".portfolio_menu ul li").click(function(){
        $(".portfolio_menu ul li").removeClass('active_prot_menu');
        $(this).addClass('active_prot_menu');
    });
    $("#portfolio").isotope({
        'itemSelector': '.portfolio_item',
        'layoutMode': 'fitRows'
    });
    $("#filters").on('click', 'a', function(event) {
        event.preventDefault();
        $("#portfolio").isotope({ 'filter': $(this).attr('data-filter') });
    });
    $("#form_email").submit(function(event) {
        event.preventDefault();
        $("#send-icon").removeClass("fa-envelope-o").addClass("fa-cog fa-spin");
        $("#form_email > button.btn").prop("disabled", true);

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: $(this).serialize(),
            success: function(data) {
                $("#send-icon").removeClass("fa-cog fa-spin").addClass("fa-check-circle-o");
                $("#form_email > button.btn").prop("disabled", false);
                $("#form_email")[0].reset();
                window.location.href = '/send/';
            },
            error: function(xhr, textStatus, errorThrown) {
                $("#send-icon").removeClass("fa-cog fa-spin").addClass("fa-times-circle-o");
                $("#form_email > button.btn").removeClass("btn-default").addClass("btn-danger");
                setTimeout(function() {
                $("#form_email > button.btn").removeClass("btn-danger").addClass("btn-default").prop("disabled", false);
                $("#send-icon").removeClass("fa-times-circle-o").addClass("fa-envelope-o");
                }, 5000);
            }
        });
    });

    $(".progress").hover(function() {
        $(this).children().addClass('progress-bar-striped active');
    }, function() {
        $(this).children().removeClass('progress-bar-striped active');
    });
    $("td > a.text-light-gray > i.fa").css('text-decoration', 'line-through').on('click', false);
    $(".contact-address > li:last-child").hover(function() { $("#res_date").fadeIn(250); }, function() { $("#res_date").fadeOut(250); });

    $('.carousel').carousel({'interval': 5000});
    $("#stanford-carousel").on('slide.bs.carousel', function(event) {
        bio_timer = $(event.relatedTarget).attr('data-slide-to');
        $("#stanford-carousel").parent().css('background-image', "url('" + bio_bg_imgs[bio_timer] + "')");
    });
    $("#stat-carousel").on('slide.bs.carousel', function(event) {
        stat_timer = $(event.relatedTarget).attr('data-slide-to');
        $("#stat-carousel").parent().css('background-image', "url('" + stat_bg_imgs[stat_timer] + "')");
    });
    $("#contact-carousel").on('slide.bs.carousel', function(event) {
        contact_timer = $(event.relatedTarget).attr('data-slide-to');
        $("#contact-carousel").parent().css('background-image', "url('" + contact_bg_imgs[contact_timer] + "')");
    });


    $('.page-scroll, .scrollTop').on('click', function(event) {
        $('html, body').stop().animate({'scrollTop': $($(this).attr('href')).offset().top - 64}, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
    $('body').scrollspy({
        'target': '#main-navbar',
        'offset': 65
    });

    var today = new Date();
    $("#cp_year").text(today.getFullYear());

    img_preload(bio_bg_imgs);
    img_preload(stat_bg_imgs);
    img_preload(contact_bg_imgs);
});


$(window).on('scroll', function() {
    if ($(window).scrollTop() >= $(window).height() / 2 + $("#main-navbar").height()) {
        if ($(window).scrollTop() >= $("footer").offset().top - $(window).height()) {
            $(".scrollTop").fadeOut();
        } else {
            $('.scrollTop').fadeIn();
        }
        $('.navbar-fixed-top').addClass('navbar-shrink navbar-default').removeClass('navbar-transparent');
        $('a.navbar-brand > i').addClass('logo_o').removeClass('logo_g');
    } else {
        $('.scrollTop').fadeOut();
        $('.navbar-fixed-top').removeClass('navbar-shrink navbar-default').addClass('navbar-transparent');
        $('a.navbar-brand > i').removeClass('logo_o').addClass('logo_g');
    }

    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        var h = ($(window).scrollTop() - $("#stanford-carousel").offset().top) / $("#stanford-carousel").height() + 0.4;
        if (h <= 0.45) {
            $("#story_2016 > div.story-item-content").addClass('active').parent().css("z-index", 15);
            $("#story_2015 > div.story-item-content").removeClass('active').parent().css("z-index", 10);
            $("#story_2011 > div.story-item-content").removeClass('active').parent().css("z-index", 10);
        } else if (h > 0.45 & h <= 0.7) {
            $("#story_2015 > div.story-item-content").addClass('active').parent().css("z-index", 15);
            $("#story_2016 > div.story-item-content").removeClass('active').parent().css("z-index", 10);
            $("#story_2011 > div.story-item-content").removeClass('active').parent().css("z-index", 10);
        } else {
            $("#story_2011 > div.story-item-content").addClass('active').parent().css("z-index", 15);
            $("#story_2016 > div.story-item-content").removeClass('active').parent().css("z-index", 10);
            $("#story_2015 > div.story-item-content").removeClass('active').parent().css("z-index", 10);
        }
    }, 100));
});


$(document).on('click', '.navbar-collapse.in', function(event) {
    if( $(event.target).is('a') && $(event.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});
