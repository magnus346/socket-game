const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');

const app = express()
const PORT = 3000

const rooms = {};

app.listen(PORT, () => {

})

app.get('/', (req, res) => {
	res.send('hello');
})

// Export the Express API
module.exports = app