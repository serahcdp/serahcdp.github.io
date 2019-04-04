// Add 'use strict' directive at the top of the new file
'use strict';

let anvils = document.getElementById('anvils');
let explosives = document.getElementById('explosives');
let decoys = document.getElementById('decoys');
let traps = document.getElementById('traps');

// fetch function


let weatherURL = "js/weather.json";
fetchData(weatherURL);

function fetchData(weatherURL) {
    let cityName = 'Greenville';
    fetch(weatherURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            console.log(data);
            let g = data[cityName];

            /* Json */

            // Get the location data
            let locName = g.City;
            let locState = g.State;
            let fullName = locName + ', ' + locState;
            // see if it worked
            console.log('fullName is: ' + fullName);

            // Temperature Data
            let locTemp = g.Temp;
            // Wind Data
            let locWind = g.Wind;
            console.log('WIND ', +locWind);
            // Current conditions
            let locSummary = g.Summary;

            //Elevation
            let elevation = g.Elevation;
            document.getElementById('feet').innerHTML = elevation;

            //Location (Longitude and latitude)
            let long = g.Longitude;
            let lat = g.Latitude;

            document.getElementById('longitude').innerHTML = long;

            document.getElementById('latitude').innerHTML = lat;

            //gusts
            let gusts = g.Gusts;
            document.getElementById('gus').innerHTML = gusts;

              //Zip
              let zip = g.Zip;
              document.getElementById('zip').innerHTML = zip;

               //Temp
            let low = g.low;
            let high = g.high;
            let temp =g.temp;

            document.getElementById('low').innerHTML = long;

            document.getElementById('high').innerHTML = lat;

            document.getElementById('curtemp1').innerHTML = lat;






            // hourly data
            let locHourly = g.Hourly;

            let pageTitle = document.getElementById('page-title');

            let fullNameNode = document.createTextNode(fullName);
            pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);

            /* HTML */
            console.log('curtemp1' + locTemp);
            // set the location info

            // get the h1 to display the city location
            let contentHeading = document.getElementById('locName');
            contentHeading.innerHTML = fullName;

            // temp info
            document.getElementById('curtemp1').innerHTML = locTemp;
            //buildWC()

            // wind info
            document.getElementById('speednum').innerHTML = locWind;
            console.log('speednum ', +locWind);
            windDial(g.Direction);
            console.log("direction: " + g.Direction);

            // current conditions info
            document.getElementById('summary-heading').innerHTML = locSummary;
            console.log('summary-heading: ' + locSummary);
            getCondition(locSummary);

            // hourly temp info
            // document.getElementById('hourTemp').innerHTML = locHourly;
            // console.log('hourTemp', + locHourly)

            // change the status of the containers
            contentContainer.setAttribute('class', ''); // removes hide class
            statusContainer.setAttribute('class', 'hide'); // hide status container
        })
        // If there is an error
        .catch(function (error) {
            console.log('There was a fetch problem: ', error.message);
            statusContainer.innerHTML = 'Sorry, the data could not be processed.';
        })
}