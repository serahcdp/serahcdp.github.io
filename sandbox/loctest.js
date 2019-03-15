//functions will work together to get weather informaton for the current location 
//and populate a web page with the data.

'use strict';

// Call the function to get our location
getGeoLocation();




//function will get the current location by longitude and latitude.
function getGeoLocation() {
    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;
      
         // Combine the values
         const locale = lat + "," + long;
         console.log(`Lat and Long are: ${locale}.`);
      
      
        })
       } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
      
} // end getGeoLocation

