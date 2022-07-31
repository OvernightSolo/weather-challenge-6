var cityInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");
var cityHistoryEl = $("#city-history");
var cityNameEl = $("#city");
var temperatureEl = $("#temp");
var windEl = $("#wind");
var humidityEl = $("#humidity");
var descriptionEl = $("#description");
var today = moment().format("MM/DD/YYYY");
var forecastBody = $(".main-forecast");
var cityEntered = cityInputEl.val();

function handleFormSubmit(e) {
  e.preventDefault();

  if (!cityEntered) {
    alert("Please enter a city.");
    return;
  }
  cityHistoryEl.append("<button>" + cityEntered + "</button>");

  cityInputEl.val("");
}

function getWeather() {
  let key = "620e0c436745e0d32b6d06368bb0fd5f";
  let language = "en";
  let units = "imperial";
  let requestUrl = `https://api.openweathermap.org/data/2.5/weather?cityEntered=${cityEntered}&appid=${key}&units=${units}&language=${language}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var nameValue = data.name + " (" + today + ")";
      var tempValue = "Temperature: " + data.main.temp + " °F";
      var windValue = "Wind Speed: " + data.wind.speed + " mph";
      var humidityValue = "Humidity: " + data.main.humidity + "%";
      var descriptionValue = "Conditions: " + data.weather[0].description;
      var iconCode = data.weather[0].icon;

      $(cityNameEl).html(nameValue);
      $(temperatureEl).html(tempValue);
      $(windEl).html(windValue);
      $(humidityEl).html(humidityValue);
      $(descriptionEl).html(descriptionValue);
    });

  $(forecastBody).append();
}

getWeather();

searchButtonEl.on("click", handleFormSubmit);
