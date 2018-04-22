// This  displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.
// This  requires the Places library.
var autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
  /** @type {!HTMLInputElement} */(document.getElementById('shippingaddress')),
  {types: ['geocode']});
}
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
 keepAutoCompleteOn();
}


//function overrides googles API code which turns off browser autocomplete.
function keepAutoCompleteOn(){
  document.getElementById('shippingname').autocomplete = 'name';
  document.getElementById('billername').autocomplete = 'name';
  document.getElementById('shippingaddress').autocomplete = 'street-address';
  document.getElementById('billeraddress').autocomplete = 'street-address';
}