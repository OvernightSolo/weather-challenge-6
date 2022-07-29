var cityInputEl = $("#search-input");
var searchButtonEl = $("#search-btn");
var cityHistoryEl = $("#city-history");

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
