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

function addScene(trigger, offset, tweenList, controller) {
    offset = offset < 1 ? offset * $(trigger).height() : offset;
    var tweenReverse = KUTE.util.chainTweens(KUTE.util.reverseTweens(tweenList));
    tweenList = KUTE.util.chainTweens(tweenList);

    new ScrollMagic.Scene({
        triggerElement: trigger,
        offset: offset
    }).on('enter', function() { tweenList.start(); })
    .on('leave', function() { tweenReverse.start(); })
    .addTo(controller);
}

tweens = tweens.default;

var cap_timer = 0, cap_class = ['text-white', 'text-light-green', 'text-green', 'text-dark-green', 'text-green', 'text-light-green'];
var arrow_timer = 0, arrow_class = ['text-white', 'text-light-green'];
var bio_timer = 0, bio_bg_imgs = ['/img/background/hover_tower.jpg', '/img/background/yosemite.jpg', '/img/background/lksc_building.jpg', '/img/background/big_sur.jpg', '/img/background/golden_gate.jpg'];
var stat_timer = 0, stat_bg_imgs = ['/img/background/fish_necklace.jpg', '/img/background/lawn_bench.jpg', '/img/background/cliff_reed.jpg', '/img/background/flower.jpg', '/img/background/tunnel.jpg'];
var contact_timer = 0, contact_bg_imgs = ['/img/background/campus_map.jpg', '/img/background/muir_trees.jpg', '/img/background/red_papercut.jpg', '/img/background/succulent.jpg', '/img/background/nano_dna.jpg'];

$("#stanford-carousel").parent().css('background-image', "url('" + bio_bg_imgs[0] + "')");
$("#stat-carousel").parent().css('background-image', "url('" + stat_bg_imgs[0] + "')");
$("#contact-carousel").parent().css('background-image', "url('" + contact_bg_imgs[0] + "')");


$(window).on('load', function() {
    // $(".page-loader").fadeOut('slow');
    var iso = new window.shuffle(document.querySelector(".PORTFOLIO__div"), {
        itemSelector: ".PORTFOLIO__entry",
        // sizer: ".PORTFOLIO__div",
        columnThreshold: 0.5,
        delimeter: ','
    });

    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {triggerHook: 'onEnter'},
        // addIndicators: true
    });

    addScene("#HOME__section", 0, [tweens.home.name, tweens.home.typeWrite1, tweens.home.typeWrite2, tweens.home.brighten], controller);
    addScene("#ABOUT__section", 125, [tweens.home.fadeTitle, tweens.home.fadeScroll], controller);
    addScene(".ABOUT__trigger", 125, [tweens.about.header, tweens.about.spinIcon], controller);
    addScene(".AFFILIATION__trigger", 125, [tweens.affliation.header], controller);
    addScene(".PORTFOLIO__trigger", 125, [tweens.portfolio.header, tweens.portfolio.showThumbnail], controller);
    addScene(".SKILLS__trigger", 125, [tweens.skills.header, tweens.skills.showProgressLeft, tweens.skills.showProgressRight], controller);
    addScene(".STATS__trigger", 125, [tweens.stats.header, tweens.stats.filpCounter, tweens.stats.countUp.project, tweens.stats.countUp.code, tweens.stats.countUp.publication, tweens.stats.countUp.scholarship], controller);
    addScene(".STATS__trigger", 875, [tweens.stats.flipGithub], controller);
    addScene(".PUBS__trigger", 125, [tweens.pubs.header, tweens.pubs.flipEntry, tweens.pubs.flipYear], controller);
    addScene(".CONTACT__trigger", 250, [tweens.contact.header, tweens.contact.flipIcon, tweens.contact.rotateIcon, tweens.contact.showListLeft, tweens.contact.showFormRight], controller);
    addScene(".footer", 0, [tweens.footer], controller);


    $(".STATS__github").load('/git/contrib/', function() {
        $(".STATS__github > svg > g > g:not(#legend) > rect.day").each(function() {
            $(this).attr({
                'data-toggle': 'tooltip',
                'data-placement': 'top',
                'title': $(this).attr('data-count') + ' contribution(s) on ' + $(this).attr('data-date')
            });
        });
        $(".STATS__github > svg").css("overflow", "visible");
    });



    $(".PORTFOLIO__menu").on('click', 'a', function(event) {
        event.preventDefault();
        $(".PORTFOLIO__menu li").removeClass('active');
        $(this).parent().addClass('active');
        iso.filter($(this).attr('data-filter'));
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

    // $('.carousel').carousel({'interval': 5000});
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
    // $('body').scrollspy({
    //     'target': '#main-navbar',
    //     'offset': 65
    // });

    img_preload(bio_bg_imgs);
    img_preload(stat_bg_imgs);
    img_preload(contact_bg_imgs);
});


$(window).on('scroll', function() {
    if ($(window).scrollTop() >= $(window).height() / 2 + $("#main-navbar").height()) {
        if ($(window).scrollTop() >= $("footer").offset().top - $(window).height()) {
            // $(".scrollTop").fadeOut();
            $(".scrollTop").hide();
        } else {
            // $('.scrollTop').fadeIn();
            $(".scrollTop").show();
        }
        $('.navbar-fixed-top').addClass('navbar-shrink navbar-default').removeClass('navbar-transparent');
        $('a.navbar-brand > i').addClass('logo_o').removeClass('logo_g');
    } else {
        $(".scrollTop").hide();
        // $('.scrollTop').fadeOut();
        $('.navbar-fixed-top').removeClass('navbar-shrink navbar-default').addClass('navbar-transparent');
        $('a.navbar-brand > i').removeClass('logo_o').addClass('logo_g');
    }

    // clearTimeout($.data(this, 'scrollTimer'));
    // $.data(this, 'scrollTimer', setTimeout(function() {
    //     var h = ($(window).scrollTop() - $("#stanford-carousel").offset().top) / $("#stanford-carousel").height() + 0.4;
    //     if (h <= 0.45) {
    //         $("#story_2016 > .AFFILIATION__content").addClass('active').parent().css("z-index", 15);
    //         $("#story_2015 > .AFFILIATION__content").removeClass('active').parent().css("z-index", 10);
    //         $("#story_2011 > .AFFILIATION__content").removeClass('active').parent().css("z-index", 10);
    //     } else if (h > 0.45 & h <= 0.7) {
    //         $("#story_2015 > .AFFILIATION__content").addClass('active').parent().css("z-index", 15);
    //         $("#story_2016 > .AFFILIATION__content").removeClass('active').parent().css("z-index", 10);
    //         $("#story_2011 > .AFFILIATION__content").removeClass('active').parent().css("z-index", 10);
    //     } else {
    //         $("#story_2011 > .AFFILIATION__content").addClass('active').parent().css("z-index", 15);
    //         $("#story_2016 > .AFFILIATION__content").removeClass('active').parent().css("z-index", 10);
    //         $("#story_2015 > .AFFILIATION__content").removeClass('active').parent().css("z-index", 10);
    //     }
    // }, 100));
});


$(document).on('click', '.navbar-collapse.in', function(event) {
    if( $(event.target).is('a') && $(event.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});
