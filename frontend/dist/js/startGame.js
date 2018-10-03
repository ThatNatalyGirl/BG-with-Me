"use strict";

var lat = "";
var long = "";

var createNewGame = function createNewGame(e) {
	event.preventDefault();
	var usernameValue = document.querySelector('[name="username"]').value;
	var gameValue = document.querySelector('[name="game"]').value;
	var playersValue = document.querySelector('[name="players"]').value;
	var locationInfoValue = document.querySelector('[name="location-info"]').value;
	var addressValue = document.querySelector('[name="address"]').value;
	var dateValue = document.querySelector('[name="date"]').value;
	var timeValue = document.querySelector('[name="time"]').value;
	var descriptionValue = document.querySelector('#description').value;
	console.log("button clicked");

	axios.post('http://178.128.76.205:1235/game', {
		username: usernameValue,
		game: gameValue,
		players: playersValue,
		locatioInfo: locationInfoValue,
		lat: lat,
		long: long,
		address: addressValue,
		date: dateValue,
		time: timeValue,
		description: descriptionValue
	}).then(function (response) {
		console.log(response);

		// usernameValue = '';
		// gameValue = '';
		// playersValue = '';
		// locationInfoValue = '';
		// addressValue = '';
		// timeValue = '';
		// descriptionValue = '';
	}).catch(function (error) {
		console.log(error);
	});
};

var autocomplete;
//for Autocompleteing Address in Start-a-Game
var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(33.7902, -84.1880), new google.maps.LatLng(33.7474, -84.4880));

var options = {
	bounds: defaultBounds,
	types: ['establishment']
};

autocomplete = new google.maps.places.Autocomplete(document.querySelector('#address'), options);

function getLatitudeLongitude() {
	console.log("getLatitudeLongitude");
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({
		'address': document.querySelector('#address').value
	}, function (results, status) {
		console.log(results);
		if (status == google.maps.GeocoderStatus.OK && results.length) {
			lat = results[0].geometry.location.lat();
			long = results[0].geometry.location.lng();
		}
	});
}

document.querySelector("#address").addEventListener("blur", getLatitudeLongitude);
document.querySelector('.eventCreated').addEventListener("click", createNewGame);
//# sourceMappingURL=startGame.js.map
