let chosenAmens = {};
$(document).ready(function () {
  $('div.amenities ul.popover li input').click(function () {
    chosenAmens = {};
    $('div.amenities ul.popover li input:checked').each(function () {
      let amenity = $(this);
      chosenAmens[amenity.attr('data-id')] = amenity.attr('data-name');
    });
    if (!$.isEmptyObject(chosenAmens)) {
      $('div.amenities h4').text(Object.values(chosenAmens).join(', '));
    } else {
      $('div.amenities h4').text('\xA0');
    }
  });
});
