const express = require('express'); //express framework
const app = express(); //app instead of express when calling functions
const port = 3000; //manually define port
const path = require('path'); //allows me to define a file-path for stylesheets a publicly accessible files
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(express.static(__dirname + '/public')); //define directory for views folder which contains stylesheets, etc
app.set('view engine', 'ejs'); //so you don't have to tpe .ejs for ever res.render command
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
	res.render('main');
});

app.get('/test', (req, res) =>{
	res.render('test');
})

app.get('/samples/3dtext', (req,res)=>{
	res.render('samples/3dtext');
})

app.post('/sendmessage', (req, res) => {
	res.send(req.body);
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'daigleportfolio13@gmail.com',
			pass: 'cegjsptorutnnuzh',
		},
	});
	const mailOptions = {
		from: 'daigleportfolio13@gmail.com',
		to: 'daiglewilliam13@gmail.com',
		subject: req.body.name+ ' - PORTFOLIO MESSAGE',
		html:'From: ' + req.body.email + ", " + req.body.name + "<br>" + 'Regarding: ' + req.body.topic + '<br>' + 'Message: ' + req.body.message 
	};
	transporter.sendMail(mailOptions, (error, info) => {
		error ? console.log(error) : console.log('Email sent: ' + info.response);
	});
});

app.listen(process.env.PORT || 3000, () => {
	//start app
	console.log(`App Started and listening on ${port}`); //Backticks necessary instead of '' to enable variables
});