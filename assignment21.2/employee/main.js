var express = require('express');
var main = express()

var expressMongoDb= require('express-mongo-db');
/* Using connection URL stored in config.js for MongoDB */
var config = require('./config');
main.use(expressMongoDb(config.database.url));

/* setting for templating view engine */
//app.set("views", "./views");
main.set('view engine','ejs');

/*
import routes/index.js
import routes/users.js
*/
var index = require('./routes/index');
var users = require('./routes/users');

/* Express validator middleware for form validation */
var expressValidator = require('express-validator');
main.use(expressValidator());

/* Body parser reads form's input that is HTTP POST data and stores it as a javascript object */
var bodyParser = require('body-parser');
/* parses the text as URL encoded data */
main.use(bodyParser.urlencoded({extended: true}));
main.use(bodyParser.json());

/* This module supports HTTP PUT and DELETE methods */
var methodOverride = require('method-override');

main.use(methodOverride(function(req, res){
	if(req.body && typeof req.body === 'object' && '_method' in req.body){
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}))

/* Flash module, flash messages that are stored in session to show success or error messages with the help of cookie-parser and session modules */
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

main.use(cookieParser('my session value'));
main.use(session({
	secret: 'my session value',
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 6000}
}))
main.use(flash());

main.use('/', index);
main.use('/users', users);

main.listen(3000, function(){
console.log('Server running at port 3000: http://localhost:3000');
})
//module.exports = app;
//console.log('http://localhost:3000 ..started');

