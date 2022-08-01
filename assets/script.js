var cityInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");
var cityHistoryEl = $("#city-history");
var cityNameEl = $("#city");
var temperatureEl = $("#temp");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var uvIndexEl = $("#uv-index");
var key = "620e0c436745e0d32b6d06368bb0fd5f";
var cityEntered;
var forecastBody = $(".current");
var currentIcon = $("#current-icon");
//1st five-day forecast variables to access DOM items
var day1Day = $("#day1-day");
var day1Icon = $("#day1-icon");
var day1High = $("#day1-high");
var day1Low = $("#day1-low");
var day1Wind = $("#day1-wind");
var day1Humid = $("#day1-humid");
//2nd five-day forecast variables to access DOM items
var day2Day = $("#day2-day");
var day2Icon = $("#day2-icon");
var day2High = $("#day2-high");
var day2Low = $("#day2-low");
var day2Wind = $("#day2-wind");
var day2Humid = $("#day2-humid");
//3rd five-day forecast variables to access DOM items
var day3Day = $("#day3-day");
var day3Icon = $("#day3-icon");
var day3High = $("#day3-high");
var day3Low = $("#day3-low");
var day3Wind = $("#day3-wind");
var day3Humid = $("#day3-humid");
//4th five-day forecast variables to access DOM items
var day4Day = $("#day4-day");
var day4Icon = $("#day4-icon");
var day4High = $("#day4-high");
var day4Low = $("#day4-low");
var day4Wind = $("#day4-wind");
var day4Humid = $("#day4-humid");
//5th five-day forecast variables to access DOM items
var day5Day = $("#day5-day");
var day5Icon = $("#day5-icon");
var day5High = $("#day5-high");
var day5Low = $("#day5-low");
var day5Wind = $("#day5-wind");
var day5Humid = $("#day5-humid");

//This is the primary function that powers the app
function handleFormSubmit(e) {
  e.preventDefault();
  var cityEntered = cityInputEl.val();
  if (!cityEntered) {
    alert("Please enter a city.");
    return;
  }
  cityHistoryEl.append("<button>" + cityEntered + "</button>");
  cityInputEl.val("");
  var today = moment();
  var coords =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityEntered +
    "&appid=" +
    key;

  //This is the fetch that converts the city input to latitude and longitude
  fetch(coords)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //This is the nested fetch that uses the latitude and longitude to get the weather
      return fetch(
        "http://api.openweathermap.org/data/2.5/onecall?lat=" +
          data[0].lat +
          "&lon=" +
          data[0].lon +
          "&exclude=hourly,minutely&units=imperial&appid=" +
          key
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var nameValue =
            cityEntered + " " + "(" + today.format("MM/DD/YYYY") + ")" + " ";
          //Determining what will go in each current weather field
          var currentIconValue =
            "<img src=http://openweathermap.org/img/wn/" +
            data.current.weather[0].icon +
            "@4x.png>";
          var tempValue = "Temperature: " + data.current.temp + " °F";
          var windValue = "Wind Speed: " + data.current.wind_speed + " mph";
          var humidityValue = "Humidity: " + data.current.humidity + "%";
          var uvIndexValue = "UV Index: " + data.current.uvi;
          //Appending the weather items to the current weather div
          $(currentIcon).html(currentIconValue);
          $(cityNameEl).html(nameValue);
          $(temperatureEl).html(tempValue);
          $(windEl).html(windValue);
          $(humidityEl).html(humidityValue);
          $(uvIndexEl).html(uvIndexValue);
          //Determining what will go in the first 5-day card
          var day1HighValue = "High: " + data.daily[0].temp.max + " °F";
          var day1IconValue =
            "<img src=http://openweathermap.org/img/wn/" +
            data.daily[0].weather[0].icon +
            ".png>";
          var day1LowValue = "Low: " + data.daily[0].temp.min + " °F";
          var day1WindValue = "Wind: " + data.daily[0].wind_speed + " mph";
          var day1HumidValue = "Humidity: " + data.daily[0].humidity + " %";
          //Appending the weather items to the first 5-day forecast
          $(day1Day).html("Tomorrow");
          $(day1Icon).html(day1IconValue);
          $(day1High).html(day1HighValue);
          $(day1Low).html(day1LowValue);
          $(day1Wind).html(day1WindValue);
          $(day1Humid).html(day1HumidValue);
          //Determining what will go in the second 5-day card
          var day2HighValue = "High: " + data.daily[1].temp.max + " °F";
          var day2IconValue =
            "<img src=http://openweathermap.org/img/wn/" +
            data.daily[1].weather[0].icon +
            ".png>";
          var day2LowValue = "Low: " + data.daily[1].temp.min + " °F";
          var day2WindValue = "Wind: " + data.daily[1].wind_speed + " mph";
          var day2HumidValue = "Humidity: " + data.daily[1].humidity + " %";
          //Appending the weather items to the second 5-day forecast
          $(day2Day).html(today.add(2, "day").format("dddd"));
          $(day2Icon).html(day2IconValue);
          $(day2High).html(day2HighValue);
          $(day2Low).html(day2LowValue);
          $(day2Wind).html(day2WindValue);
          $(day2Humid).html(day2HumidValue);
          //Determining what will go in the third 5-day card
          var day3HighValue = "High: " + data.daily[2].temp.max + " °F";
          var day3IconValue =
            "<img src=http://openweathermap.org/img/wn/" +
            data.daily[2].weather[0].icon +
            ".png>";
          var day3LowValue = "Low: " + data.daily[2].temp.min + " °F";
          var day3WindValue = "Wind: " + data.daily[2].wind_speed + " mph";
          var day3HumidValue = "Humidity: " + data.daily[2].humidity + " %";
          //Appending the weather items to the third 5-day forecast
          $(day3Day).html(today.add(1, "day").format("dddd"));
          $(day3Icon).html(day3IconValue);
          $(day3High).html(day3HighValue);
          $(day3Low).html(day3LowValue);
          $(day3Wind).html(day3WindValue);
          $(day3Humid).html(day3HumidValue);
          //Determining what will go in the fourth 5-day card
          var day4HighValue = "High: " + data.daily[3].temp.max + " °F";
          var day4IconValue =
            "<img src=http://openweathermap.org/img/wn/" +
            data.daily[3].weather[0].icon +
            ".png>";
          var day4LowValue = "Low: " + data.daily[3].temp.min + " °F";
          var day4WindValue = "Wind: " + data.daily[3].wind_speed + " mph";
          var day4HumidValue = "Humidity: " + data.daily[3].humidity + " %";
          //Appending the weather items to the fourth 5-day forecast
          $(day4Day).html(today.add(1, "day").format("dddd"));
          $(day4Icon).html(day4IconValue);
          $(day4High).html(day4HighValue);
          $(day4Low).html(day4LowValue);
          $(day4Wind).html(day4WindValue);
          $(day4Humid).html(day4HumidValue);
          //Determining what will go in the fifth 5-day card
          var day5HighValue = "High: " + data.daily[4].temp.max + " °F";
          var day5IconValue =
            "<img src=http://openweathermap.org/img/wn/" +
            data.daily[4].weather[0].icon +
            ".png>";
          var day5LowValue = "Low: " + data.daily[4].temp.min + " °F";
          var day5WindValue = "Wind: " + data.daily[4].wind_speed + " mph";
          var day5HumidValue = "Humidity: " + data.daily[4].humidity + " %";
          //Appending the weather items to the fifth 5-day forecast
          $(day5Day).html(today.add(1, "day").format("dddd"));
          $(day5Icon).html(day5IconValue);
          $(day5High).html(day5HighValue);
          $(day5Low).html(day5LowValue);
          $(day5Wind).html(day5WindValue);
          $(day5Humid).html(day5HumidValue);
        });
    });
}

// function getWeather() {}
// getWeather();

// This is click event that triggers the entire app
searchButtonEl.on("click", handleFormSubmit);
