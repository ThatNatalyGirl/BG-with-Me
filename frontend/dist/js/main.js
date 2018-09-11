'use strict';

console.log('this is the game js');

// when the user clicks the button

var createNewGame = function createNewGame() {
	var usernameValue = document.querySelector('[name="username"]').value;
	var gameValue = document.querySelector('[name="game"]').value;
	var playersValue = document.querySelector('[name="players"]').value;
	var locationInfoValue = document.querySelector('[name="location-info"]').value;
	var addressValue = document.querySelector('[name="address"]').value;
	var timeValue = document.querySelector('[name="time"]').value;
	var descriptionValue = document.querySelector('[name="description"]').value;
	console.log("button clicked");

	//sending to app.js the word written and color selected ;D
	axios.post('http://localhost:1235/gamePost', {
		username: usernameValue,
		game: gameValue,
		players: playersValue,
		locatioInfo: locationInfoValue,
		address: addressValue,
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
	// send the tag to the server
	// changeFontColor()
};

document.querySelector('button.eventCreated').addEventListener("click", createNewGame);

// function changeFontColor() {
// 	var color = document.getElementById("color").value; // cached

// 	// The working function for changing background color.
// 	document.bgColor = color;

// 	// The code I'd like to use for changing the text simultaneously - however it does not work.
// 	document.getElementById("textColor").style.color = color;
// }
//# sourceMappingURL=main.js.map
