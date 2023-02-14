const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');
const axios = require('axios');

const app = express()
const PORT = 3000

// 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

const tkn = 'nIwGEYJ7sSVR13Pitc7Ddm9f';

app.listen(PORT, () => {

})

app.get('/', async (req, res) => {
	const response = await axios({
		"url": "https://api.vercel.com/v13/deployments",
		"data": {
			"name": "scrpr",
			"gitSource": "socket-game"
		},
		"headers": {
			"Authorization": "Bearer "+tkn
		},
		"method": "post"
	}).catch(function (error) {
	console.log(error.toJSON());
	});
	res.send('hello');
})

// Export the Express API
module.exports = app