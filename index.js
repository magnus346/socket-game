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
	const response = await axios({
		"url": "https://api.render.com/v1/services",
		"data": {
			type: 'web_service',
			name: 'scrp-'+uuidv4,
			ownerId: 'usr-cflldq53t39778spffi0',
			repo: 'https://github.com/magnus346/socket-game',
			autoDeploy: 'no'
		},
		"headers": {
			"Authorization": "Bearer "+tkn
		},
		"method": "post"
	}).catch(function (error) {
		console.log(error);
	});
	console.log(response);
	res.send('hello');
})

// Export the Express API
module.exports = app