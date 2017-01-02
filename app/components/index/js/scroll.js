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


$(window).on('load', function() {
    // $(".page-loader").fadeOut('slow');

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
