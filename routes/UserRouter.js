var express = require('express');
var router = express.Router();
var userController = require('../api/controllers/UserController');
var asyncHandler = require('../api/services/AsyncHandler');
var policies = require('../api/services/Policies');
var passport = require('../api/services/AuthService');

router.get('/signup', policies.isLoggedIn, function(req, res, next) {
  res.render('signup', {title: 'User Signup'});
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/user/home',
	failureRedirect: '/user/signup',
	failureFlash: true,
	successFlash: true
}));

router.get('/login', policies.isLoggedIn, (req, res)=>{
	res.render('login', {title: 'login'});
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/user/home',
	failureRedirect: '/user/login',
	failureFlash: true,
	successFlash: true
}));

router.get('/home', policies.notLoggedIn, (req, res)=>{
	res.render('home', {title: 'home'});
});

router.get('/chat', (req, res)=>{
	res.render('chat');
})

module.exports = router;
