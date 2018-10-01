//for The Actual Map on Find-a-Game
var map;


function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.7490, lng: -84.3880},
		zoom: 5
	});
	
	//Get the info from the games started
	axios.get('http://localhost:1235/gamePost', {})

	.then(function (response) {
		console.log('here is the get response data for key:', response.data);

		var currentGames = response.data
		currentGames.forEach(function(game){
			var latLng = {lat: game.lat, lng: game.long}

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: game.locationInfo,
				animation: google.maps.Animation.DROP,
			});

			console.log(game.players)

			var currentSlots = game.players

			var data = 
				`<div class="location-marker"> 
					<h2>`+ game.game + `</h2>
					</br>
					<p><span>Who's Idea:</span> `+ game.username + `</p>
					<p><span>Where:</span> `+ game.locatioInfo + `</p>
					<p><span>Address:</span> `+ game.address + `</p>
					<p><span>Who :</span> `+ `Me & ` + game.players + ` players</p>
					<p><span>When:</span> `+ game.date + `</p>
					<p><span>What Time:</span> `+ game.time + `</p>
					<p><span>Slots Available:</span> `+ currentSlots + `</p>
					</br>
					<a class="join-button" onclick="joinGame()"> See Game</a>
				</div>`
			;

			var infowindow = new google.maps.InfoWindow({
				content: data,
				maxWidth: 200
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});

			displayJoinGameOptions(game)
		})
	})
}


function joinGame() {
	axios.get('http://localhost:1235/gamePost', {})

	.then(function (response) {
		console.log(response.data)
	})
}

function displayJoinGameOptions(currentGame) {
	let joinGameDiv = document.createElement('div');
	let joinGameTitle = document.createElement('h2');
	let joinGameDescription = document.createElement('p');
	let joinGameCurrentSlots = document.createElement('p');
	let buttonDiv = document.createElement('div');
	let joinGameButton = document.createElement('a');
	let dontJoinGameButton = document.createElement('a');

	document.body.appendChild(joinGameDiv)
	joinGameDiv.appendChild(joinGameTitle);
	joinGameDiv.appendChild(joinGameDescription);
	joinGameDiv.appendChild(joinGameCurrentSlots);
	joinGameDiv.appendChild(buttonDiv);
	buttonDiv.appendChild(joinGameButton);
	buttonDiv.appendChild(dontJoinGameButton);
	console.log("did it work?")

	joinGameDiv.classList.add("join-game-div")
	buttonDiv.classList.add("button-div")
	joinGameButton.classList.add("actual-join-game-button")
	dontJoinGameButton.classList.add("cancel")

	joinGameTitle.innerHTML = currentGame.game
	joinGameDescription.innerHTML = "DESCRIPTION NEEDS TO GO HERE ONCE YOU FIGURE IT OUT!!!!!!!!!!!!!"
	joinGameButton.innerHTML = "Join This Game"
	dontJoinGameButton.innerHTML = "Cancel"
	joinGameCurrentSlots.innerHTML = currentGame.players

	// joinGameButton.event.addEventListener('click', function() {
	// 	// var	slot = joinGameCurrentSlots.value
		// slot -- 
	// 	console.log ("slot")		
	// });
}


// Make slots available a countdown sort of thing that goes down as you join the game. 

//You need to be able to access the a tag that is being created
//you need to send the comments section through the API






