var cityInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");
var cityHistoryEl = $("#city-history");
var cityNameEl = $("#city");
var temperatureEl = $("#temp");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var uvIndexEl = $("#uv-index");

function handleFormSubmit(e) {
  e.preventDefault();

  var cityEntered = cityInputEl.val();

  if (!cityEntered) {
    alert("Please enter a city.");
    return;
  }
  cityHistoryEl.append("<button>" + cityEntered + "</button>");

  cityInputEl.val("");
}
searchButtonEl.on("click", handleFormSubmit);

var today = moment();
$("#example").text(today.format("MMMM Do YYYY, h:mm:ss a"));

var forecastBody = $(".main-forecast");

function getWeather() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=london&appid=620e0c436745e0d32b6d06368bb0fd5f&units=imperial";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var nameValue = "Here's the city name";
      var tempValue = "Here's the temperature";
      var windValue = "Here's the wind speed";
      var humidityValue = "Here's the humidity";
      var uvIndexValue = "Here's the UV index";

      $(cityNameEl).html(nameValue);
      $(temperatureEl).html(tempValue);
      $(windEl).html(windValue);
      $(humidityEl).html(humidityValue);
      $(uvIndexEl).html(uvIndexValue);
    });

  $(forecastBody).append();
}

getWeather();
