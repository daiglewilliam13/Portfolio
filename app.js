require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const Achievement = require('./models/achievement.js');
const Contact = require('./models/contact.js');


//test 

const corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
	optionsSuccessStatus: 204,
	allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
mongoose.connect(process.env.DB_URL);
main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect(process.env.DB_URL);
}

app.get('/', (req, res) => {
	res.render('main');
});

app.get('/test', (req, res) => {
	res.render('test');
});

app.get('/samples/3dtext', (req, res) => {
	res.render('samples/3dtext');
});

app.post('/samples/basketball/games', async (req, res) => {
	console.log(req.body);
	const gameOptions = {
		method: 'GET',
		url: 'https://api-nba-v1.p.rapidapi.com/games/teamId/' + req.body.team,
		headers: {
			'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
			'x-rapidapi-key': process.env.BB_API_KEY,
		},
	};
	const gameData = await axios.request(gameOptions).then((response) => {
		return response.data;
	});
	res.send(gameData);
});

app.get('/samples/basketball/games/stats/:id', async (req, res) => {
	const detailOptions = {
		method: 'GET',
		url: 'https://api-nba-v1.p.rapidapi.com/gameDetails/' + req.params.id,
		headers: {
			'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
			'x-rapidapi-key': process.env.BB_API_KEY,
		},
	};

	const statOptions = {
		method: 'GET',
		url: 'https://api-nba-v1.p.rapidapi.com/statistics/players/gameId/' + req.params.id,
		headers: {
			'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
			'x-rapidapi-key': process.env.BB_API_KEY,
		},
	};
	const playerStats = await axios.request(statOptions).then((response) => {
		return response.data;
	});
	const gameDetails = await axios.request(detailOptions).then((response) => {
		return response.data;
	});

	let gameInfo = {
		details: gameDetails,
		stats: playerStats,
	};
	res.send(gameInfo);
});

app.get('/samples/basketball', async (req, res) => {
	const teamOptions = {
		method: 'GET',
		url: 'https://api-nba-v1.p.rapidapi.com/teams/league/standard',
		headers: {
			'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
			'x-rapidapi-key': process.env.BB_API_KEY,
		},
	};
	const seasonOptions = {
		method: 'GET',
		url: 'https://api-nba-v1.p.rapidapi.com/seasons/',
		headers: {
			'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
			'x-rapidapi-key': process.env.BB_API_KEY,
		},
	};
	const seasonArr = await axios
		.request(seasonOptions)
		.then(function (response) {
			const res = response.data.api.seasons;
			return res;
		})
		.catch(function (error) {
			console.error(error);
		});
	const teamArr = await axios
		.request(teamOptions)
		.then(function (response) {
			const teams = response.data.api.teams;
			const arr = teams
				.filter((team) => team.nbaFranchise == '1' && team.allStar == '0')
				.map((team) => {
					return { name: team.fullName, id: team.teamId };
				});
			return arr;
		})
		.catch(function (error) {
			console.error(error);
		});
	res.render('samples/basketball', { seasons: seasonArr, teams: teamArr });
});

app.get('/samples/basketball/players/:id', async (req, res) => {
	const playerId = req.params.id;
	const apiOptions = {
		method: 'GET',
		url: 'https://api-nba-v1.p.rapidapi.com/players/playerId/'+playerId,
		headers: {
			'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
			'x-rapidapi-key': process.env.BB_API_KEY
		},
	};
	const getPlayer = axios.request(apiOptions).then((response)=>{
		res.send(response.data);
	})
});

app.post('/samples/achievement/save', (req, res) => {
	console.log(req.body);
	const achievement = new Achievement({
		name: req.body.name,
		achievements: req.body.achievements,
		date: Date.now(),
	});
	achievement.save().then((newObject) => console.log('success: ' + newObject));
	res.send(achievement);
});

app.get('/samples/achievement/other', (req, res) => {
	Achievement.aggregate([{ $sample: { size: 1 } }]).then((achievements) =>
		res.send(achievements)
	);
});

app.post('/samples/achievement/update', (req, res) => {
	const id = req.body.id;
	const achievements = req.body.achievements;
	const name = req.body.name;
	console.log(achievements);
	Achievement.findOneAndUpdate(
		{ _id: id },
		{ $addToSet: { achievements: achievements }, $set: { name: name } }
	).then((response) => {
		res.send(response);
	});
});

app.get('/samples/achievement/:id', (req, res) => {
	Achievement.findOne({ _id: req.params.id }).then((ach) => res.send(ach));
});

app.get('/samples/achievement/delete/:id', (req, res) => {
	Achievement.deleteOne({ _id: req.params.id }).then((response) => {
		console.log(response);
		res.send('delete route:' + req.params.id + response);
	});
});

app.get('/samples/5word', (req,res)=>{
	res.render('samples/5word');
})

app.get('/samples/contact-list/', (req,res)=>{
	Contact.find({}).then((contacts)=>{
		res.send(contacts)})
	
})

app.post('/samples/contact-list/add', (req,res)=>{
	const newContact = new Contact({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		_id: mongoose.Types.ObjectId()
	})
	newContact.save().then((newObject)=>{res.send(newObject)})
})

app.post('/samples/contact-list/update', (req, res)=>{
	const id = req.body._id;
	const update ={
			name:req.body.name,
			email:req.body.email,
			phone:req.body.phone
			};
	Contact.findOneAndUpdate(
		{_id:id},update, {
			returnOriginal:false,
		}).then((updatedContact)=>{res.send(updatedContact)})
})

app.get('/samples/contact-list/delete/:id', (req, res)=>{
	const contactId = req.params.id;
	Contact.deleteOne({_id:contactId})
	.then((response)=>{
		res.send({message: 'OK', _id: contactId})
	})
})

app.post('/sendmessage', (req, res) => {
	res.send(req.body);
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL_ADD,
			pass: process.env.MAIL_PASS,
		},
	});
	const mailOptions = {
		from: process.env.MAIL_ADD,
		to: 'daiglewilliam13@gmail.com',
		subject: req.body.name + ' - PORTFOLIO MESSAGE',
		html:
			'From: ' +
			req.body.email +
			', ' +
			req.body.name +
			'<br>' +
			'Regarding: ' +
			req.body.topic +
			'<br>' +
			'Message: ' +
			req.body.message,
	};
	transporter.sendMail(mailOptions, (error, info) => {
		error ? console.log(error) : console.log('Email sent: ' + info.response);
	});
});

app.listen(port || 3000, () => {
	console.log(`App Started and listening on ${port}`);
});