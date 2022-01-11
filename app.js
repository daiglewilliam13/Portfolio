require('dotenv').config();
const express = require('express'); 
const app = express();
const port = 8080; 
const path = require('path'); 
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors')
const Achievement = require("./models/achievement.js");

app.use(cors());
app.use(express.static(__dirname + '/public')); 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
mongoose.connect(process.env.DB_URL);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.get('/', (req, res) => {
	res.render('main');
});

app.get('/test', (req, res) =>{
	res.render('test');
})

app.get('/samples/3dtext', (req,res)=>{
	res.render('samples/3dtext');
})

app.post('/samples/achievement/save', (req, res)=>{
	console.log(req.body);
	const achievement = new Achievement({
		name: req.body.name,
		achievements:req.body.achievements,
		date: Date.now(),
	});
	achievement.save().then(newObject => console.log('success: '+newObject));
	res.send(achievement);
})

app.get('/samples/achievement/other',(req, res)=>{
	Achievement.aggregate([{$sample: {size:1}}]).then(achievements => res.send(achievements));
})

app.post('/samples/achievement/update', (req,res)=>{
	const id=req.body.id;
	const achievements=req.body.achievements;
	const name=req.body.name;
	console.log(achievements);
	Achievement.findOneAndUpdate({_id:id},{$addToSet: {achievements: achievements}, $set: {name: name}})
	.then((response)=>{
	res.send(response);
	})

})

app.get('/samples/achievement/:id', (req, res)=>{
	Achievement.findOne({_id:req.params.id}).then((ach)=>res.send(ach));
})

app.get('/samples/achievement/delete/:id', (req, res)=>{
	Achievement.deleteOne({_id:req.params.id})
	.then((response)=>{
	console.log(response);
	res.send('delete route:' + req.params.id + response);	
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
		subject: req.body.name+ ' - PORTFOLIO MESSAGE',
		html:'From: ' + req.body.email + ", " + req.body.name + "<br>" + 'Regarding: ' + req.body.topic + '<br>' + 'Message: ' + req.body.message 
	};
	transporter.sendMail(mailOptions, (error, info) => {
		error ? console.log(error) : console.log('Email sent: ' + info.response);
	});
});

app.listen(port, () => {
	console.log(`App Started and listening on ${port}`); 
});