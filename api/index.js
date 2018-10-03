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
	res.send('Add /game please to the URL :D')
})

app.get('/supersecretclearalldataroute', function(req, res){
	currentGames = []
	res.send('BOOOOOOMM all gone')
})

app.get('/game', function(req, res){
	// filter game list to remove games that have passed, and full games
	let filteredGames = currentGames.filter(function(game) {
		return game.players > 0
	})

	res.send(filteredGames)
		console.log("am I working?")
})

app.post('/game', function(req, res) {
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
		description: "why won't you work"
	}

	currentGames.push(newGame)

	res.send([newGame])

	//it's encoding it in json for us.
	//this is sending the tags array so that we can see it on our localhost:####/game
})


app.post('/game/:index', function(req, res) {
	req.params.index
})

// app.listen(1235, () => console.log('Example app listening on port 1235!'))
app.listen(1235, function(){
	console.log('Listening on port 1235!')
}) 








