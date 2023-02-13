const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');
const axios = require('axios');

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
	const response = await axios.request({
		"url": "https://api.vercel.com/v9/projects",
		"data": {
			"name": "scrpr",
			"gitRepository": {
				"repo": "socket-game",
				"type": "github"
			}
		},
		"headers": {
			"Authorization": "Bearer "+tkn
		},
		"method": "POST"
	});
	res.send(response);
})

// Export the Express API
module.exports = app