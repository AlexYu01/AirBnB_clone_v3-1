let chosenAmens = {};
$(document).ready(function () {

  function fillPlaces (filter) {
    $.when($.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(filter),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        data = data.sort(function (first, second) {
          if (first.name < second.name) {
            return (-1);
          } else if (first.name === second.name) {
            return (0);
          } else {
            return (1);
          }
        });
      }
    })).done(function (data) {
      setPlaces(data);
    });
  }

  function setPlaces (places) {
    let i;
    let pDict;
    $('section.places').empty();
    for (i = 0, len = places.length; i < len; i++) {
      pDict = places[i];
      let place = $('<article></article>');

      let title = $('<div class="title"></div>');
      title.append($('<h2></h2>').text(pDict.name));
      title.append($('<div class="price_by_night"></div>').text(pDict.price_by_night));

      let info = $('<div class="information"></div>');

      let guests = $('<div class="max_guest"></div>');
      guests.append($('<i class="fa fa-users fa-3x" aria-hidden="true"></i>'), $('<br />'), pDict.max_guest + ' Guests');

      let rooms = $('<div class="number_rooms"></div>');
      rooms.append($('<i class="fa fa-bed fa-3x" aria-hidden="true"></i>'), $('<br />'), pDict.number_rooms + ' Bedrooms');

      let bathrooms = $('<div class="number_bathrooms">');
      bathrooms.append($('<i class="fa fa-bath fa-3x" aria-hidden="true"></i>'), $('<br />'), pDict.number_bathrooms + ' Bathroom');

      info.append(guests, rooms, bathrooms);

      let desc = $('<div class="description"></div>').text(pDict.description);

      place.append(title, info, desc);
      $('SECTION.places').append(place);
      }
  }



  $('div.amenities ul.popover li input').click(function () {
    if($(this).is(':checked')) {
      chosenAmens[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete chosenAmens[$(this).attr('data-id')];
    }
    if (!$.isEmptyObject(chosenAmens)) {
      $('div.amenities h4').text(Object.values(chosenAmens).join(', '));
    } else {
      $('div.amenities h4').text('\xA0');
    }
  });

  $('.container button').click(function () {
    let amen = {};
    amen['amenities'] = Object.keys(chosenAmens);
    setPlaces(fillPlaces(amen));
  });

  $.ajax({
    'url': 'http://0.0.0.0:5001/api/v1/status/',
    'type': 'GET',
    'success': function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      }
    }
  });

  fillPlaces({});
});
