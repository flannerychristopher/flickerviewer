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
                let photoHTML = '<ul>';
                $.each(data.items, function(i, photo)  {
                  photoHTML += '<li>';
                  photoHTML += '<a href="' + photo.link + '">';
                  photoHTML += '<img src="' + photo.media.m + '"></a></li>';
                });
                photoHTML += '</ul>';
                $('#photos').html(photoHTML);
              }

            );
  });


}); // close document ready
