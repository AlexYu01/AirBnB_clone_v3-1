let pickedAmens = {};
$(document).ready(function () {
  $('div.amenities ul.popover li input').click(function () {
    checkedAmens();
  });
});

function checkedAmens () {
  pickedAmens = {};
  $('div.amenities ul.popover li input:checked').each(function () {
    let amenity = $(this);
    pickedAmens[amenity.attr('data-id')] = amenity.attr('data-name');
  });
  if (!$.isEmptyObject(pickedAmens)) {
    $('div.amenities h4').text(Object.values(pickedAmens).join(', '));
  } else {
    $('div.amenities h4').text('\xA0');
  }
}
