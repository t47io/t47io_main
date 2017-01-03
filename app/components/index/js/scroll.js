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


    img_preload(bio_bg_imgs);
    img_preload(stat_bg_imgs);
    img_preload(contact_bg_imgs);
});



$(document).on('click', '.navbar-collapse.in', function(event) {
    if( $(event.target).is('a') && $(event.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});
