//for The Actual Map on Find-a-Game
var map;
var currentGames; // array of game data, filled later by ajax

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.7490, lng: -84.3880},
		zoom: 12
	});
	
	//Get the info from the games started
	axios.get('http://178.128.76.205:1235/game', {})

	.then(function (response) {
		console.log('here is the get response data for key:', response.data);

		currentGames = response.data
		currentGames.forEach(function(game, i){
			var latLng = {lat: game.lat, lng: game.long}

			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: game.locationInfo,
				animation: google.maps.Animation.DROP,
			});

			console.log(game.description)


			// var infoWindowContent = 
			// 	`<div class="location-marker"> 
			// 		<h1>${i}</h1>
			// 		<h2>`+ game.game + `</h2>
			// 		</br>
			// 		<p><span>Who's Idea:</span> `+ game.username + `</p>
			// 		<p><span>Where:</span> `+ game.locatioInfo + `</p>
			// 		<p><span>Address:</span> `+ game.address + `</p>
			// 		<p><span>Who :</span> `+ `Me & ` + game.players + ` players</p>
			// 		<p><span>When:</span> `+ game.date + `</p>
			// 		<p><span>What Time:</span> `+ game.time + `</p>
			// 		<p class="slots-avail"><span>Slots Available:</span> `+ game.players + `</p>
			// 		</br>
			// 		<a class="join-button" onclick="displayJoinGameOptions(${i})"> See Game</a>
			// 	</div>`
			// ;

			// var infowindow = new google.maps.InfoWindow({
			// 	content: infoWindowContent,
			// 	maxWidth: 200
			// });

			google.maps.event.addListener(marker, 'click', function() {
				// infowindow.open(map,marker);
				displayJoinGameOptions(i) // skipping the info window entirely
			});

		})
	})
}


function displayJoinGameOptions(gameIndex) {
	
	let currentGame = currentGames[gameIndex];

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
	joinGameDescription.innerHTML = currentGame.description
	joinGameButton.innerHTML = "Join This Game"
	dontJoinGameButton.innerHTML = "Cancel"
	joinGameCurrentSlots.innerHTML = currentGame.players

	// var	slot = joinGameCurrentSlots.innerHTML

	joinGameButton.addEventListener('click', function() {
		// slot --
		// joinGameCurrentSlots.innerHTML = slot
		// console.log ("slot ", slot, currentGame.players)	

		// if (joinGameCurrentSlots.innerHTML == 0 ) {
		// 	joinGameDiv.style.display = "none"
		// 	console.log("ack")
		// }	
		// var currentPlayers = currentGame.players--

		// do ajax call to join the game (-- the number of player slots )
		axios
			.post('http://178.128.76.205:1235/game/' + currentGame.id)
			.then(function (response) {
				console.log('here is the get response data for key:', response.data);
				currentGame.players--
				joinGameCurrentSlots.innerHTML = currentGame.players;

				console.log(currentGame.players)
			})
	});
}


// Make slots available a countdown sort of thing that goes down as you join the game. 

//You need to be able to access the a tag that is being created
//you need to send the comments section through the API






