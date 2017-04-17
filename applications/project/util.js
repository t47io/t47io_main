
$(window).on("resize", function() {
    clearTimeout($(window).data(this, 'resizeTimer'));
    $(window).data(this, 'resizeTimer', setTimeout(function() {
      for (var i = 0; i < gviz_handles.length; i++) {
          gviz_handles[i].draw();
      }

      if ($(window).width() <= 768) {
        $("ul.ul_desp").removeClass("lead");
      } else {
        $("ul.ul_desp").addClass("lead");
      }
    }, 200));
});

$(window).on('scroll', function() {
  if ($(window).scrollTop() >= $(window).height() / 2 + $(".navbar-fixed-top").height()) {
    if ($(window).scrollTop() >= $("footer").offset().top - $(window).height()) {
      $(".scrollTop").fadeOut();
    } else {
      $('.scrollTop').fadeIn();
    }
  } else {
    $('.scrollTop').fadeOut();
  }
});


$(document).ready(function() {
  if ($(window).width() <= 768) {
    $("ul.ul_desp").removeClass("lead");
  } else {
    $("ul.ul_desp").addClass("lead");
  }

  $(".dropdown-toggle").dropdown();
  $(".dropdown").hover(
    function(){ $(this).addClass("open"); },
    function(){ $(this).removeClass("open"); }
  );
});
