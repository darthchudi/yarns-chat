var express = require('express');
var router = express.Router();
var userController = require('../api/controllers/UserController');
var asyncHandler = require('../api/services/AsyncHandler');
var policies = require('../api/services/Policies');
var passport = require('../api/services/AuthService');

router.get('/signup', policies.isLoggedIn, function(req, res, next) {
  res.render('signup', {title: 'User Signup'});
});

router.post('/signup', (req, res, next)=>{
	passport.authenticate('local-signup', (err, user, info)=>{
		if(err){
			res.status(500).json({
				success: false,
				message: 'Server seems to down'
			});
			return;
		}

		if(!user){
			res.status(401).json({
				success: false,
				message: 'Username is taken!'
			});
			return;
		}

		res.status(200).json({
			success: true,
			user: user,
			token: info
		});

	})(req, res, next);
});


router.post('/login', (req, res, next)=>{
	passport.authenticate('local-login', (err, user, info)=>{
		if(err){
			res.status(500).json({
				success: false,
				message: 'Server seems to down'
			});
			return;
		}

		if(!user){
			res.status(401).json({
				success: false,
				message: 'Invalid username or password!'
			});
			return;
		}
		
		res.status(200).json({
			success: true,
			user: user,
			token: info
		});
	})(req, res, next);
});

router.get('/home', policies.notLoggedIn, (req, res)=>{
	res.render('home', {title: 'home'});
});

module.exports = router;
