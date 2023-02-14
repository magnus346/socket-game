const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');
const axios = require('axios');

const app = express()
const PORT = 3000

const tkn = 'x6nzGDEq4havOYnRtt5q6hnP';

app.listen(PORT, () => {

})

app.get('/', async (req, res) => {
	/*
	const response = await axios({
		url: "https://api.render.com/v1/services/srv-cfllf453t39778spt8cg",
		data: {
			name: 'scrp-'+uuidv4(),
		},
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			"Authorization": "Bearer "+tkn
		},
		method: "patch"
	}).catch(function (error) {
		console.log(error);
	});
	console.log(response);
	*/
	res.send('hello');
})

// Export the Express API
module.exports = app