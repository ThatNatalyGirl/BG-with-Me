//for The Actual Map on Find-a-Game
var map;


function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.7490, lng: -84.3880},
		zoom: 5
	});
	
	//Get the info from the games started
	axios.get('http://localhost:1235/gamePost', {
		// params: searchParams,
	})
	.then(function (response) {
		console.log('here is the get response data for key:', response.data);

		var currentGames = response.data
		currentGames.forEach(function(game){
			var latLng = {lat: game.lat, lng: game.long}
			
			// var img = '../img/marker.png'
			// var img = 'http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png'

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: game.locationInfo,
				animation: google.maps.Animation.DROP,
				// icon: img
			});

			console.log(game.players)

			var currentSlots = game.players

			var data = 
				`<div class="location-marker"> 
					<h2>`+ game.game + `</h2>
					</br>
					<p>Who: `+ game.username + `</p>
					<p>Where: `+ game.locatioInfo + `</p>
					<p> Address: `+ game.address + `</p>
					<p> How Many: `+ game.players + ` players</p>
					<p> When: `+ game.time + `</p>
					<p> Current Slots: `+ currentSlots + `</p>
					</br>
					<a class="join-button" onclick="joinGame()"> Join Game </a>
				</div>`
			;

			var infowindow = new google.maps.InfoWindow({
				content: data
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		})
	})
}


function joinGame() {
	axios.get('http://localhost:1235/gamePost', {
	})

	.then(function (response) {
		displayJoinGameOptions(response.data)
		console.log(response.data)
	})
}

function displayJoinGameOptions(currentGame) {
	let joinGameDiv = document.createElement('div');
	let joinGameTitle = document.createElement('h2');
	let joinGameDescription = document.createElement('p');
	let joinGameCurrentSlots = document.createElement('p');
	let joinGameButton = document.createElement('a');
	let dontJoinGameButton = document.createElement('a');

	document.body.appendChild(joinGameDiv)
	joinGameDiv.appendChild(joinGameTitle);
	joinGameDiv.appendChild(joinGameDescription);
	joinGameDiv.appendChild(joinGameCurrentSlots);
	joinGameDiv.appendChild(joinGameButton);
	joinGameDiv.appendChild(dontJoinGameButton);
	console.log("did it work?")

	joinGameDiv.classList.add("join-game-div")

	joinGameTitle.innerHTML = currentGame.game
}


// Make slots available a countdown sort of thing that goes down as you join the game. 






