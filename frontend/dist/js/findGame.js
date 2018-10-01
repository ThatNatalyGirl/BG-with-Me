'use strict';

//for The Actual Map on Find-a-Game
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 33.7490, lng: -84.3880 },
		zoom: 5
	});

	//Get the info from the games started
	axios.get('http://localhost:1235/gamePost', {
		// params: searchParams,
	}).then(function (response) {
		console.log('here is the get response data for key:', response.data);

		var currentGames = response.data;
		currentGames.forEach(function (game) {
			var latLng = { lat: game.lat, lng: game.long

				// var img = '../img/marker.png'
				// var img = 'http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png'

			};var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: game.locationInfo,
				animation: google.maps.Animation.DROP
				// icon: img
			});

			console.log(game.players);

			var currentSlots = game.players;

			var data = '<div class="location-marker"> \n\t\t\t\t\t<h2>' + game.game + '</h2>\n\t\t\t\t\t</br>\n\t\t\t\t\t<p>Who: ' + game.username + '</p>\n\t\t\t\t\t<p>Where: ' + game.locatioInfo + '</p>\n\t\t\t\t\t<p> Address: ' + game.address + '</p>\n\t\t\t\t\t<p> How Many: ' + game.players + ' players</p>\n\t\t\t\t\t<p> When: ' + game.time + '</p>\n\t\t\t\t\t<p> Current Slots: ' + currentSlots + '</p>\n\t\t\t\t\t</br>\n\t\t\t\t\t<a class="join-button" onclick="joinGame()"> Join Game </a>\n\t\t\t\t</div>';

			var infowindow = new google.maps.InfoWindow({
				content: data
			});

			google.maps.event.addListener(marker, 'click', function () {
				infowindow.open(map, marker);
			});
		});
	});
}

function joinGame() {
	axios.get('http://localhost:1235/gamePost', {}).then(function (response) {
		displayJoinGameOptions(response.data);
		console.log(response.data);
	});
}

function displayJoinGameOptions(currentGame) {
	var joinGameDiv = document.createElement('div');
	var joinGameTitle = document.createElement('h2');
	var joinGameDescription = document.createElement('p');
	var joinGameCurrentSlots = document.createElement('p');
	var joinGameButton = document.createElement('a');
	var dontJoinGameButton = document.createElement('a');

	document.body.appendChild(joinGameDiv);
	joinGameDiv.appendChild(joinGameTitle);
	joinGameDiv.appendChild(joinGameDescription);
	joinGameDiv.appendChild(joinGameCurrentSlots);
	joinGameDiv.appendChild(joinGameButton);
	joinGameDiv.appendChild(dontJoinGameButton);
	console.log("did it work?");

	joinGameDiv.classList.add("join-game-div");

	joinGameTitle.innerHTML = currentGame.game;
}

// Make slots available a countdown sort of thing that goes down as you join the game.
//# sourceMappingURL=findGame.js.map
