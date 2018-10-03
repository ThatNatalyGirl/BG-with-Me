let lat = ""
let long = ""

let createNewGame = function(e){
	event.preventDefault()
	let usernameValue = document.querySelector('[name="username"]').value
	let gameValue = document.querySelector('[name="game"]').value
	let playersValue = document.querySelector('[name="players"]').value
	let locationInfoValue = document.querySelector('[name="location-info"]').value
	let addressValue = document.querySelector('[name="address"]').value
	let dateValue = document.querySelector('[name="date"]').value
	let timeValue = document.querySelector('[name="time"]').value
	let descriptionValue = document.querySelector('#description').value
	console.log("button clicked")


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
		description: descriptionValue,
	})

	.then(function (response) {
		console.log(response);

		// usernameValue = '';
		// gameValue = '';
		// playersValue = '';
		// locationInfoValue = '';
		// addressValue = '';
		// timeValue = '';
		// descriptionValue = '';
	})
	.catch(function (error) {
		console.log(error);
	});
}

document.querySelector('button.eventCreated').addEventListener("click", createNewGame);


var autocomplete;
//for Autocompleteing Address in Start-a-Game
var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(33.7902, -84.1880),
		new google.maps.LatLng(33.7474, -84.4880));

var input = document.getElementById('address');
var options = {
	bounds: defaultBounds,
	types: ['establishment']
};
	
autocomplete = new google.maps.places.Autocomplete(input, options);


var geocoder;

function codeAddress() {
	var address = input.value;
	console.log(address)
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( {'address': address}, function(results) {
		// map.setCenter(results[0].geometry.location);
		// var marker = new google.maps.Marker({
		// 	map: map,
		// 	position: results[0].geometry.location
		// });
	});
	console.log(geocoder)

	getLatitudeLongitude(showResult, address)
}

document.querySelector(".eventCreated").addEventListener("onclick", codeAddress())


function showResult(result) {
	lat = result.geometry.location.lat();
	long = result.geometry.location.lng();
}

function getLatitudeLongitude(callback, address) {
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







	

















