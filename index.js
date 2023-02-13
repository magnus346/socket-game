const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');

const app = express()
const PORT = 3000

const rooms = {};

app.listen(PORT, () => {

})

app.get('/', (req, res) => {
	const nets = networkInterfaces();
	let ip = null;
	outer_loop:
	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
			// 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
			const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
			if (net.family === familyV4Value && !net.internal) {
				ip = net.address;
				break outer_loop;
			}
		}
	}
	document.write('http://'+ip+':'+PORT);
	process.exit();
})

// Export the Express API
module.exports = app