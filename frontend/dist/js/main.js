'use strict';

console.log('this is the game js');

// when the user clicks the button
document.querySelector('button.eventCreated').addEventListener("click", function () {
	var usernameValue = document.querySelector('[name="username"]').value;
	var gameValue = document.querySelector('[name="game"]').value;
	var playersValue = document.querySelector('[name="players"]').value;
	var locationValue = document.querySelector('[name="location"]').value;
	var timeValue = document.querySelector('[name="time"]').value;
	var descriptionValue = document.querySelector('[name="description"]').value;

	//sending to app.js the word written and color selected ;D
	axios.post('http://localhost:1235/gamePost', {
		username: usernameValue,
		game: gameValue,
		players: playersValue,
		location: locationValue,
		time: timeValue,
		description: descriptionValue
	}).then(function (response) {
		console.log(response);
	}).catch(function (error) {
		console.log(error);
	});
	// send the tag to the server
	// changeFontColor()
});

// function changeFontColor() {
// 	var color = document.getElementById("color").value; // cached

// 	// The working function for changing background color.
// 	document.bgColor = color;

// 	// The code I'd like to use for changing the text simultaneously - however it does not work.
// 	document.getElementById("textColor").style.color = color;
// }
//# sourceMappingURL=main.js.map
