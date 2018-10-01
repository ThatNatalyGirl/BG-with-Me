'use strict';

//for The Actual Map on Find-a-Game
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 33.7490, lng: -84.3880 },
		zoom: 5
	});

	//Get the info from the games started
	axios.get('http://localhost:1235/gamePost', {}).then(function (response) {
		console.log('here is the get response data for key:', response.data);

		var currentGames = response.data;
		currentGames.forEach(function (game) {
			var latLng = { lat: game.lat, lng: game.long };

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: game.locationInfo,
				animation: google.maps.Animation.DROP
			});

			console.log(game.players);

			var currentSlots = game.players;

			var data = '<div class="location-marker"> \n\t\t\t\t\t<h2>' + game.game + '</h2>\n\t\t\t\t\t</br>\n\t\t\t\t\t<p><span>Who\'s Idea:</span> ' + game.username + '</p>\n\t\t\t\t\t<p><span>Where:</span> ' + game.locatioInfo + '</p>\n\t\t\t\t\t<p><span>Address:</span> ' + game.address + '</p>\n\t\t\t\t\t<p><span>Who :</span> ' + 'Me & ' + game.players + ' players</p>\n\t\t\t\t\t<p><span>When:</span> ' + game.date + '</p>\n\t\t\t\t\t<p><span>What Time:</span> ' + game.time + '</p>\n\t\t\t\t\t<p><span>Slots Available:</span> ' + currentSlots + '</p>\n\t\t\t\t\t</br>\n\t\t\t\t\t<a class="join-button" onclick="joinGame()"> See Game</a>\n\t\t\t\t</div>';

			var infowindow = new google.maps.InfoWindow({
				content: data,
				maxWidth: 200
			});

			google.maps.event.addListener(marker, 'click', function () {
				infowindow.open(map, marker);
			});

			displayJoinGameOptions(game);
		});
	});
}

function joinGame() {
	axios.get('http://localhost:1235/gamePost', {}).then(function (response) {
		console.log(response.data);
	});
}

function displayJoinGameOptions(currentGame) {
	var joinGameDiv = document.createElement('div');
	var joinGameTitle = document.createElement('h2');
	var joinGameDescription = document.createElement('p');
	var joinGameCurrentSlots = document.createElement('p');
	var buttonDiv = document.createElement('div');
	var joinGameButton = document.createElement('a');
	var dontJoinGameButton = document.createElement('a');

	document.body.appendChild(joinGameDiv);
	joinGameDiv.appendChild(joinGameTitle);
	joinGameDiv.appendChild(joinGameDescription);
	joinGameDiv.appendChild(joinGameCurrentSlots);
	joinGameDiv.appendChild(buttonDiv);
	buttonDiv.appendChild(joinGameButton);
	buttonDiv.appendChild(dontJoinGameButton);
	console.log("did it work?");

	joinGameDiv.classList.add("join-game-div");
	buttonDiv.classList.add("button-div");
	joinGameButton.classList.add("actual-join-game-button");
	dontJoinGameButton.classList.add("cancel");

	joinGameTitle.innerHTML = currentGame.game;
	joinGameDescription.innerHTML = "DESCRIPTION NEEDS TO GO HERE ONCE YOU FIGURE IT OUT!!!!!!!!!!!!!";
	joinGameButton.innerHTML = "Join This Game";
	dontJoinGameButton.innerHTML = "Cancel";
	joinGameCurrentSlots.innerHTML = currentGame.players;

	// joinGameButton.event.addEventListener('click', function() {
	// 	// var	slot = joinGameCurrentSlots.value
	// slot -- 
	// 	console.log ("slot")		
	// });
}

// Make slots available a countdown sort of thing that goes down as you join the game. 

//You need to be able to access the a tag that is being created
//you need to send the comments section through the API
//# sourceMappingURL=findGame.js.map
