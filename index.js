const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { networkInterfaces } = require('os');
const axios = require('axios');
const cheerio = require("cheerio");
const unirest = require("unirest");

const selectRandomUserAgent = () => {
    const userAgents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36", ]
    var randomNumber = Math.floor(Math.random() * userAgents.length);
    return userAgents[randomNumber];
}

const scrap = async() => {
	const url = "https://www.google.com/search?q=accropode&gl=fr&lr=lang_fr&hl=lang_fr&start="+(10*0);

	return unirest
	.get(url)
	.headers({
		"User-Agent":
		selectRandomUserAgent()
	})
	.then((response) => {
		let $ = cheerio.load(response.body);

		let results = [];
		
		if($(".g-recaptcha").length)
			throw new Error('Recaptcha');
		else {
			$(".g").each((i,el) => {
				results.push({
					title: $(el).find("h3").text(),
					link: $(el).find("a").attr("href")
				})
			})
			return results;
		}
	})
}

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
	res.send('hello');
})

app.get('/scrap/', async (req, res) => {
	try {
		const results = await scrap();
		res.send(results);
	} catch (e) {
		const name = await reboot();
		res.send({reboot: 'https://'+name+'.vercel.app'});		
	}
})

// Export the Express API
module.exports = app