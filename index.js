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
			"name": "scrpr"
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