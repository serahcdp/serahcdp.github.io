//functions will work together to get weather informaton for the current location 
//and populate a web page with the data.

'use strict';

// Call the function to get our location
getGeoLocation();




//function will get the current location by longitude and latitude.
function getGeoLocation() {
    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';
} // end getGeoLocation

