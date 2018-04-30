var passport = require('passport'), localStrategy = require('passport-local').Strategy;
var User = require('../models/User');

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
				return done(null, false, req.flash('authError', 'That username is taken already!'));
			}

			var newUser = new User({
				firstname: req.body.firstName,
				lastname: req.body.lastName,
				username: req.body.username,
				password: req.body.password
			});
			newUser.save((err)=>{
				if(err) return done(err);

				return done(null, newUser, req.flash('accountCreated', `🎉🎉 account created  with username ${newUser.username} `));

			})

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

			if(!user) return done(null, false, req.flash("authError", "Account doesn't exist"));

			if(!user.comparePassword(password)){
				done(null, false, req.flash("authError", "Invalid username or password"));
			}

			done(null, user);
		})
	}
));

module.exports = passport;