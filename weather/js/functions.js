/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

//console.log('My javascript is being read.');
// Variables for Function Use
const temp = 31;
const speed = 5;
const direction = "N"; //Set your own value
const condition = "rainy";
const meters = 145;

// Get the next hour based on the current time
let date = new Date();
let nextHour = date.getHours() + 1;

buildWC(speed, temp);
windDial(direction);
const keyword = getCondition(condition);
changeSummaryImage(keyword);
convertMeters(meters);

// this function will calculate a wind chill temperature.
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');

    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    // Round the answer down to integer
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
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
    } else if (condition.includes("Rain") || condition.includes("rainy") || condition.includes("wet weather")) {
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
    document.getElementById("feet").innerHTML = Math.round(feet)
    console.log("Feet", feet) //feet.toFixed(2);
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







