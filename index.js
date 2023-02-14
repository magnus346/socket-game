const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');
const axios = require('axios');

const app = express()
const PORT = 3000

const tkn = 'x6nzGDEq4havOYnRtt5q6hnP';

app.listen(PORT, () => {

})

const reboot = async function() {
	const nme = 'scrp-'+uuidv4();
	const old_projects = await axios({
		url: "https://api.vercel.com/v9/projects",
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			"Authorization": "Bearer "+tkn
		},
		method: "get"
	}).catch(function (error) {
		console.log(error.response);
	});
	for(let project of old_projects.data.projects) {
		await axios({
			url: "https://api.vercel.com/v9/projects/"+project.id,
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				"Authorization": "Bearer "+tkn
			},
			method: "delete"
		}).catch(function (error) {
			console.log(error.response);
		});
	}
	await axios({
		url: "https://api.vercel.com/v9/projects",
		data: {
			name: nme,
			gitRepository: {repo: 'magnus346/socket-game', type: 'github'}
		},
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			"Authorization": "Bearer "+tkn
		},
		method: "post"
	}).catch(function (error) {
		console.log(error.response);
	});
	await axios({
		url: "https://api.vercel.com/v13/deployments",
		data: {
			name: nme,
			gitSource: {org: 'magnus346', repo: 'socket-game', type: 'github', ref: 'main'}
		},
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			"Authorization": "Bearer "+tkn
		},
		method: "post"
	}).catch(function (error) {
		console.log(error.response);
	});
	const new_projects = await axios({
		url: "https://api.vercel.com/v9/projects",
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			"Authorization": "Bearer "+tkn
		},
		method: "get"
	}).catch(function (error) {
		console.log(error.response);
	});
	let new_project = null;
	for(let project of new_projects.data.projects) {
		new_project = project;
	}	
	return new_project.name;
}

app.get('/', async (req, res) => {
	res.send('https://'+new_project.name+'.vercel.app');
})

app.get('/scrap/', async (req, res) => {
	const name = await reboot();
	res.send('https://'+name+'.vercel.app');
})

// Export the Express API
module.exports = app