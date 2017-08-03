$(document).ready(function() {
  let photoDiv = $('#photos');


  $('button').click(function() {
    $('button').removeClass("active");
    $(this).addClass("active");
    photoDiv.html('');

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
                photoDiv.html(photoHTML);
              }

            );
  });

  $('form').submit( function(evt) {
    evt.preventDefault();
    photoDiv.html('');
    let searchInput = $('#search');
    let searchButton = $('#submit');

    searchInput.prop("disabled", true);
    searchButton.attr("disabled", true).val("searching now...");

    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
              {
                tags: searchInput.val(),
                format: "json",
              },
              function(data) {
                if (data.items.length) {
                  let photoHTML = '<ul>';
                  $.each(data.items, function(i, photo)  {
                    photoHTML += '<li>';
                    photoHTML += '<a href="' + photo.link + '">';
                    photoHTML += '<img src="' + photo.media.m + '"></a></li>';
                  });
                  photoHTML += '</ul>';
                  photoDiv.html(photoHTML);
                } else {
                  let textHTML = "Sorry, no results were found for ";
                  textHTML += searchInput.val();
                  photoDiv.html(textHTML);
                }
                searchInput.prop("disabled", false);
                searchButton.attr("disabled", false).val("Search again");
              }
            );
  });


}); // close document ready
