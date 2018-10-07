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

		window.location.href = "../";
	})
	.catch(function (error) {
		console.log(error);
	});
}



var autocomplete;
//for Autocompleteing Address in Start-a-Game
var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(33.7902, -84.1880),
		new google.maps.LatLng(33.7474, -84.4880));

var options = {
	bounds: defaultBounds,
	types: ['establishment']
};
	
autocomplete = new google.maps.places.Autocomplete(document.querySelector('#address'), options);



function getLatitudeLongitude() {
	console.log("getLatitudeLongitude")
	var geocoder = new google.maps.Geocoder();
	
	geocoder.geocode({
		'address': document.querySelector('#address').value
	}, function (results, status) {
		console.log(results)
		if (status == google.maps.GeocoderStatus.OK && results.length) {
			lat = results[0].geometry.location.lat();
			long = results[0].geometry.location.lng();
		}
	});
}



document.querySelector("#address").addEventListener("blur", getLatitudeLongitude)
document.querySelector('.eventCreated').addEventListener("click", createNewGame);

	

















