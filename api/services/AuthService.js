var passport = require('passport'), localStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../models/User');
require('dotenv').config();

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, (err, user)=>{
		done(err, user);
	})
});

passport.use('local-signup', new localStrategy(
	{
		passReqToCallback: true
	},
	function(req, username, password, done){
		User.findOne({username: username}, (err, user)=>{
			if(err) return done(err);
			if(user){
				return done(null, false);
			}

			User.create({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				username: req.body.username,
				password: req.body.password
			}, (err, newUser)=>{
				if(err) return done(err);

				var token = jwt.sign({id: newUser._id}, process.env.TOKEN_SECRET);
				delete newUser.password;
				return done(null, newUser, token);
			});
		})
	}
));

passport.use('local-login', new localStrategy(
	{
		passReqToCallback: true
	},
	function(req, username, password, done){
		User.findOne({username: username}, (err, user)=>{
			if(err) return done(err);

			if(!user) return done(null, false);

			if(!user.comparePassword(password)){
				return done(null, false);
			}

			delete user.password;

			var token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);
			return done(null, user, token);
		})
	}
));

module.exports = passport;