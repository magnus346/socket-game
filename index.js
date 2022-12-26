const express = require('express')
const { v4: uuidv4 } = require('uuid');

const app = express()
const PORT = 3000

const rooms = {};

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
	res.send(req.id)
	if(typeof req.id !== "undefined" && typeof rooms[req.id] !== "undefined") {
		res.send(JSON.stringify(rooms[req.id]))
	} else res.send('')
})

app.get('/start', (req, res) => {
	let id = uuidv4();
	rooms[id] = {};
	res.send('ID : '+id)
})

// Export the Express API
module.exports = app