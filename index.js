const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');
const axios = require('axios');
const sdk = require('api')('@render-api/v1.0#1bmwdfld2bezs7');

const app = express()
const PORT = 3000

const tkn = 'rnd_KeKLvRMQEdsN92Yq8BLa3hydUENR';

app.listen(PORT, () => {

})

app.get('/', async (req, res) => {
	sdk.auth(tkn);
	sdk.createService({
		type: 'web_service',
		name: 'scrp-'+uuidv4,
		ownerId: 'usr-cflldq53t39778spffi0',
		repo: 'https://github.com/magnus346/socket-game',
		autoDeploy: 'no'
	})
	.then(({ data }) => console.log(data))
	.catch(err => console.error(err));
	res.send('hello');
})

// Export the Express API
module.exports = app