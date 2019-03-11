// Add 'use strict' directive at the top of the new file
'use strict';

let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('page-content');


// fetch function


let weatherURL = "/weather/js/weather.json";
fetchData(weatherURL);
function fetchData(weatherURL){
    let cityName = 'Greenville'; 
    fetch(weatherURL)
        .then(function(response){
            if(response.ok){
            return response.json();
        }
        throw new ERROR('Network response was not OK.');
        })
        .then(function(data){
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

            // Current conditions
            let locSummary = g.Summary;

            // hourly data
            let locHourly = g.Hourly;

            let pageTitle = document.getElementById('page-title');
            
            let fullNameNode = document.createTextNode(fullName);
            pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);

            /* HTML */
            console.log('curtemp1'+ locTemp);
            // set the location info

            // get the h1 to display the city location
            let contentHeading = document.getElementById('locName');
            contentHeading.innerHTML = fullName;

            // temp info
            document.getElementById('curtemp1').innerHTML = locTemp;

            // wind info
            document.getElementById('speednum').innerHTML = locWind;
            console.log('speednum ', + locWind);

            // current conditions info
            document.getElementById('summary-heading').innerHTML = locSummary;
            console.log('summary-heading: ' + locSummary);

            // hourly temp info
            // document.getElementById('hourTemp').innerHTML = locHourly;
            // console.log('hourTemp', + locHourly)

            // change the status of the containers
            contentContainer.setAttribute('class', ''); // removes hide class
            statusContainer.setAttribute('class', 'hide'); // hide status container
        })
        // If there is an error
        .catch(function(error){
            console.log('There was a fetch problem: ', error.message);
            statusContainer.innerHTML = 'Sorry, the data could not be processed.';
        })
    }

    