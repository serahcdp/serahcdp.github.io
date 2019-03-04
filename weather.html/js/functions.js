/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

//console.log('My javascript is being read.');
// Variables for Function Use
const temp = 31;
const speed = 5;
const direction = "N"; //Set your own value
const condition = "Clear";
const meters = 145;

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

}
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