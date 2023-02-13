const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');

const app = express()
const PORT = 3000

const tkn = 'nIwGEYJ7sSVR13Pitc7Ddm9f';

app.listen(PORT, () => {

})

app.get('/', async (req, res) => {
	/*
	await fetch("https://api.vercel.com/v9/projects/scrpr", {
		"headers": {
			"Authorization": "Bearer "+tkn
		},
		"method": "delete"
	})
	*/
	await fetch("https://api.vercel.com/v9/projects", {
		"body": {
			"name": "scrpr",
			"gitRepository": {
				"repo": "socket-game",
				"type": "github"
			}
		},
		"headers": {
			"Authorization": "Bearer "+tkn
		},
		"method": "post"
	}).then((response)=>console.log(response));
	res.send('hello')
})

// Export the Express API
module.exports = app