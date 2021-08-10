const express 				= require('express'); //express framework
const app 					= express(); //app instead of express when calling functions
const port 					= 3000; //manually define port
const path 					= require('path'); //allows me to define a file-path for stylesheets a publicly accessible files

app.use(express.static(__dirname + '/public')); //define directory for views folder which contains stylesheets, etc
app.set('view engine', 'ejs'); //so you don't have to tpe .ejs for ever res.render command


app.get('/', (req, res) => {
	res.render('main');
})

app.get('/more', (req, res) =>{
	res.render('more');
})

app.listen( port, () => { //start app
	console.log(`App Started and listening on ${port}`); //Backticks necessary instead of '' so the port variable is correctly displayed
});