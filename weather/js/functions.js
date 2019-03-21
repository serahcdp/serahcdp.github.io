/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

// Add 'use strict' directive at the top of the new file
'use strict';

let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('page-content');


// Setup localStorage
var storage = window.localStorage;
// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project - dor17004@byui.edu"
    }
};




//console.log('My javascript is being read.');
// Variables for Function Use
// const temp = 31;
// const speed = 5;
// const direction = "N"; //Set your own value
// const condition = "rainy";
// const meters = 145;

// Get the next hour based on the current time
let date = new Date();
let nextHour = date.getHours() + 1;

// buildWC(speed, temp);
// windDial(direction);
// const keyword = getCondition(condition);
// changeSummaryImage(keyword);
// convertMeters(meters);
// buildPage();

// this function will calculate a wind chill temperature.
function buildWC(speed, temp) {
    //const feelTemp = document.getElementById('feelTemp');
    
    speed = parseInt(speed);
    console.log("speed", speed);
    console.log("temp", temp);
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    // Round the answer down to integer
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the windchill
    console.log("windchll",wc);
    //feelTemp.innerHTML = wc;
    return wc;
}
// Wind Dial Function
function windDial(direction) {
    // Get the wind dial container
    const dial = document.getElementById("dial");

    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}


function getCondition(condition) {
    console.log(condition);

    if (condition.includes("Cloud") || condition.includes("Cloudy") || condition.includes("Party Cloudy") ||
        condition.includes("Overcast")) {
        let keyword = "cloud";
        console.log(keyword);
        return (keyword);
    } else if (condition.includes("Clear") || condition.includes("Sunny") || condition.includes("Mostly clear")) {
        let keyword = "clear";
        console.log(keyword);
        return (keyword);
    } else if (condition.includes("Fog") || condition.includes("misty")) {
        let keyword = "fog";
        console.log(keyword);
        return (keyword);
    } else if (condition.includes("Rain") || condition.includes("Rainy") || condition.includes("wet weather")) {
        let keyword = "rain";
        console.log(keyword);
        return (keyword);
    } else if (condition.includes("Snow") || condition.includes("snowy") || condition.includes("freezing")) {
        let keyword = "snow";
        console.log(keyword);
        return (keyword);
    }
}


/* *************************************
 *   Function change Summary Image
 ************************************* */
function changeSummaryImage(keyword) {
    console.log("keyword in changesummaryimage");
    console.log(keyword);
    const currentWeather = document.getElementById("weather-info");
    const image = document.getElementById("image-weather");
    switch (keyword) {
        case "cloud":
            console.log("cloud");
            currentWeather.setAttribute("class", "clouds"); //"cloud" is the CSS rule selector
            image.setAttribute("src", "../responsive_images/clouds_300.jpg");
            break;
        case "clear":
            console.log("clear");
            currentWeather.setAttribute("class", "clear");
            image.setAttribute("src", "../responsive_images/clear_300.jpg");
            break;
        case "snow":
            console.log("class: snow");
            currentWeather.setAttribute("class", "snow");
            image.setAttribute("src", "../responsive_images/snow_300.jpg");
            break;
        case "fog":
            console.log("fog");
            currentWeather.setAttribute("class", "fog");
            image.setAttribute("src", "../responsive_images/fog_300.jpg");
            break;
        case "rain":
            console.log("rain");
            currentWeather.setAttribute("class", "rain");
            image.setAttribute("src", "../responsive_images/rain_300.jpg");
            break;
    }
}
//convert elevation
function convertMeters(meters) {
    const feet = meters * 3.28;
    //document.getElementById("feet").innerHTML = Math.round(feet)
    //console.log("Feet", feet) //feet.toFixed(2);
    return feet;
}



//This function will convert and format hours to a 12 hour format
function format_time(hour) {
    if (hour > 23) {
        hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
        hour -= 12;
    }
    if (hour == 0) {
        hour = "12";
    }
    return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
}





// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale;
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                console.log('SEARCHING FOR URL');
                console.log(response);

                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            // console.log('Json object from getLocation function:');
            // console.log(data);
            // Store data to localstorage
            //console.log("KDCJSCKVC");
            console.log("locNAME", data)
            console.log(data);
            var forecasturl = data.properties.forecastHourly;
            console.log(forecasturl);
            storage.setItem("forecasturl", data.properties.forecastHourly);
            storage.setItem("locName", data.properties.relativeLocation.properties.city);
            storage.setItem("locState", data.properties.relativeLocation.properties.state);
            
            storage.setItem("location1", data.geometry.coordinates[1]);
            storage.setItem("location2", data.geometry.coordinates[0]);

            // Next, get the weather station ID before requesting current conditions 
            // URL for station list is in the data object 
            let stationsURL = data.properties.observationStations;
            // Call the function to get the list of weather stations
            getStationId(stationsURL);
            getHourly();
            getWeather(forecasturl);
        })
        .catch(error => console.log('There was a getLocation error: ', error))
} // end getLocation function



// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) {
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getStationId function:');
            console.log(data);

            // Store station ID and elevation (in meters - will need to be converted to feet) 
            let stationId = data.features[0].properties.stationIdentifier;
            let stationElevation = data.features[0].properties.elevation.value;
            console.log('Station and Elevation are: ' + stationId, stationElevation);

            // Store data to localstorage 
            storage.setItem("stationId", stationId);
            storage.setItem("stationElevation", stationElevation);

            // Request the Current Weather for this station 
            getWeather2(stationId);
        })
        .catch(error => console.log('There was a getStationId error: ', error))
} // end getStationId function

function getWeather2(stationId) {
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getWeather2 function:');
            
            // Store weather information to localStorage 
            console.log("data from GET WEATHER 2",data.properties.maxTemperatureLast24Hours.value);
            storage.setItem("hTemp", data.properties.maxTemperatureLast24Hours.value)
            console.log("data from GET WEATHER 2",data);
        })
        .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function



// Gets current weather information for a specific weather station from the NWS API
function getWeather(URL) {
    // This is the URL for current observation data 
    //const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    //fetch(URL, idHeader)
    fetch(URL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getWeather function:');
            
            // Store weather information to localStorage 
            console.log("data to put in localStorage",data);

            var information = data.properties.periods[0];
            var elevation = data.properties.elevation.value;
            console.log("elevation", elevation);
            console.log("information", information);

             // Store data to localstorage 
             storage.setItem("temperature", information.temperature);
             storage.setItem("description", information.shortForecast);
             storage.setItem("windDirection", information.windDirection);
             storage.setItem("windSpeed", information.windSpeed);
             storage.setItem("elevation", elevation);

            // Build the page for viewing 
            buildPage();
        })
        .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function



function getHourly() {
    var URL = storage.getItem('forecasturl');
    fetch(URL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From get Hourly function:');
            console.log(data);

            // Select just the arry with the 155hours
            var listHours = data.properties.periods;
            //console.log("array with hours", listHours);

            let ol = document.querySelector("ol");
            var d = new Date();
            var hour = d.getHours();
            //Loop through the array to show the first 13hours and select the temperature from each of them
            for(var i=0; i <= 12; i++){
                //console.log("hour", hour);
                //console.log("first 13 elements: ", listHours[i].temperature);
                let myli = document.createElement("li");
                myli.textContent = hour + ":00 " + listHours[i].temperature + "\xB0F | ";
                hour++;
                if(hour == 24){
                    hour = 0;
                }
                
                ol.appendChild(myli);
            }

        })
        .catch(error => console.log('There was a getHourly error: ', error))
    console.log('url forecasturl', URL);

}


// Populate the current location weather page
function buildPage() {
    console.log("FUNTION BUILDPage");
    // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
    let temp = storage.getItem("temperature");
    let speed = storage.getItem("speed");
    let elevation =  storage.getItem("elevation");
    let locName = storage.getItem("locName");
    let locState = storage.getItem("locState");
    let longitude = storage.getItem("location1");
    let latitude= storage.getItem("location2");
    let temperature= storage.getItem("temperature");
    let windDirection = storage.getItem("windDirection");

    let direction = storage.getItem("direction");
    windDial(direction);

    let wc = buildWC(speed, temp);
    
    let condition = storage.getItem("description");
    const keyword = getCondition(condition);
    changeSummaryImage(keyword);

    let feet = convertMeters(elevation);

    // Task 2 - Populate location information
    document.getElementById("locName").innerHTML = locName + ", " + locState;
    // Task 3 - Populate weather information
    document.getElementById("feet").innerHTML = feet.toFixed(2);
    document.getElementById("longitude").innerHTML = longitude;
    document.getElementById("latitude").innerHTML = latitude;
    document.getElementById("temperature").innerHTML = temperature;
    document.getElementById("feelTemp").innerHTML = wc;
    document.getElementById("windSpeed"). innerHTML = speed;
    document.getElementById("windDirection").innerHTML = windDirection;
    document.getElementById("summary-heading").innerHTML = condition;

    
    // let hTemp = storage.getItem("hTemp");
    // hTemp = convertToFahrenheit(hTemp);
    // let lTemp = storage.getItem("lTemp");
    // lTemp = convertToFahrenheit(lTemp);

    // document.getElementById("hTemp").innerHTML = hTemp;
    // document.getElementById("lTemp").innerHTML = lTemp;


    // Task 4 - Hide status and show main
      // change the status of the containers
      contentContainer.setAttribute('class', ''); // removes hide class
      statusContainer.setAttribute('class', 'hide'); // hide status container
}

function convertToFahrenheit(numCelcius){
    let fahrenheit = Math.round((numCelcius * 1.8) + 32);
    return fahrenheit;
}