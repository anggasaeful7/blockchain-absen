handlePermission(this);

function handlePermission(geoBtn) {
  navigator.permissions.query({ name: "geolocation" }).then(function (result) {
    if (result.state == "prompt" || result.state == "granted") {
      navigator.geolocation.getCurrentPosition(
        revealPosition,
        showErrorLocation
      );
    } else {
      console.log(result.state);
    }
    result.onchange = function () {
      console.log(result.state);
    };
  });
}

function revealPosition(position) {
  var data = position.coords;
  var lat = data.latitude;
  var long = data.longitude;
  document.getElementById("lat").innerHTML = lat;
  document.getElementById("long").innerHTML = long;
}

function showErrorLocation(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      var err = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      var err = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      var err = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      var err = "An unknown error occurred.";
      break;
  }
  console.log(err);
}
