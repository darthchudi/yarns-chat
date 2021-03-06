var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./api/services/AuthService');
var router = require('./routes/router');
var app = express();
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Mongoose Connection
// mongoose.connect("mongodb://localhost:27017/chat");
mongoose.connect(process.env.DB_CONNECTION);
mongoose.promise = global.Promise;
mongoose.connection.on('error', (err)=>{
	console.log(err.message);
});

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//Set locals variables
app.use(function(req, res, next){
	res.locals.authError = req.flash('authError');
	res.locals.accountCreated = req.flash('accountCreated');
	res.locals.user = req.user || null;
	next();
});

//Mount Routes
app.use('/api', router);

//Serve Files
if(process.env.NODE_ENV === 'production'){
	app.use(express.static('react-client/build'));
	app.get('*', (req, res)=>{
		res.sendFile(path.join(__dirname, 'react-client', 'build', 'index.html'));
	})
} else{
	// app.use(express.static('react-client'));
	// app.get('*', (req, res)=>{
	// 	res.sendFile(path.join(__dirname, 'react-client', 'public', 'index.html'));
	// })
}

// catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
