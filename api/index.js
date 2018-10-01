const colors = require('colors')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true}))

console.log('running index.js'.green)

let currentGames = []

app.get('/', function(req, res){
	res.send('Add /gamePost please to the URL :D')
})

app.get('/gamePost', function(req, res){
	res.send(currentGames)
	console.log("am I working?")
})

app.post('/gamePost', function(req, res) {
	console.log("am I getting it?")
	let newGame = {
		username: req.body.username,
		game: req.body.game,
		players: req.body.players,
		locatioInfo: req.body.locatioInfo,
		address: req.body.address,
		lat: req.body.lat,
		long: req.body.long,
		time: req.body.time,
		date: req.body.date,
		description: req.body.description,
	}

	currentGames.push(newGame)

	res.send([newGame])

	//it's encoding it in json for us.
	//this is sending the tags array so that we can see it on our localhost:####/gamePost
})

// app.listen(1235, () => console.log('Example app listening on port 1235!'))
app.listen(1235, function(){
	console.log('Listening on port 1235!')
}) 








