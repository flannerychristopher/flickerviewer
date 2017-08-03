$(document).ready(function() {
  $('button').click(function() {
    $('button').removeClass("active");
    $(this).addClass("active");

    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
              {
                tags: $(this).text(),
                format: "json",
              },
              function(data) {

              }
            );
  });


}); // close document ready
