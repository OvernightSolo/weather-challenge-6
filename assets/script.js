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
  var today = moment().format("MM/DD/YYYY");
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
            cityEntered +
            " " +
            "(" +
            today +
            ")" +
            " " +
            "<img src=http://openweathermap.org/img/wn/" +
            data.current.weather[0].icon +
            ".png>";
          var tempValue = "Temperature: " + data.current.temp + " °F";
          var windValue = "Wind Speed: " + data.current.wind_speed + " mph";
          var humidityValue = "Humidity: " + data.current.humidity + "%";
          var uvIndexValue = "UV Index: " + data.current.uvi;
          //These items append the weather items to the current weather div
          $(cityNameEl).html(nameValue);
          $(temperatureEl).html(tempValue);
          $(windEl).html(windValue);
          $(humidityEl).html(humidityValue);
          $(uvIndexEl).html(uvIndexValue);

          // $(forecastBody).append();
        });
    });
}

// function getWeather() {}
// getWeather();

// This is click event that triggers the entire app
searchButtonEl.on("click", handleFormSubmit);
