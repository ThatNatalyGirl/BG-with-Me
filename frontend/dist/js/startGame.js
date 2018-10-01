"use strict";

var lat = "";
var long = "";

var createNewGame = function createNewGame() {
	var usernameValue = document.querySelector('[name="username"]').value;
	var gameValue = document.querySelector('[name="game"]').value;
	var playersValue = document.querySelector('[name="players"]').value;
	var locationInfoValue = document.querySelector('[name="location-info"]').value;
	var addressValue = document.querySelector('[name="address"]').value;
	var dateValue = document.querySelector('[name="date"]').value;
	var timeValue = document.querySelector('[name="time"]').value;
	var descriptionValue = document.querySelector('[name="description"]').value;
	console.log("button clicked");

	axios.post('http://localhost:1235/gamePost', {
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

document.querySelector('button.eventCreated').addEventListener("click", createNewGame);

console.log("I'm a map");

var autocomplete;
//for Autocompleteing Address in Start-a-Game
var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(33.7902, -84.1880), new google.maps.LatLng(33.7474, -84.4880));

var input = document.getElementById('address');
var options = {
	bounds: defaultBounds,
	types: ['establishment']
};

autocomplete = new google.maps.places.Autocomplete(input, options);

var geocoder;

function codeAddress() {
	var address = input.value;
	console.log(address);
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'address': address }, function (results) {
		// map.setCenter(results[0].geometry.location);
		var marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location
		});
	});
	console.log(geocoder);

	getLatitudeLongitude(showResult, address);
}

// document.querySelector(".eventCreated").addEventListener("onclick", codeAddress())


function showResult(result) {
	lat = result.geometry.location.lat();
	long = result.geometry.location.lng();
}

function getLatitudeLongitude(callback, address) {
	// If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
	address = address;
	// Initialize the Geocoder
	geocoder = new google.maps.Geocoder();
	if (geocoder) {
		geocoder.geocode({
			'address': address
		}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				callback(results[0]);
			}
		});
	}
}
//# sourceMappingURL=startGame.js.map
