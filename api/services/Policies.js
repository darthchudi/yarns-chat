module.exports = {
	isLoggedIn: function(req, res, next){
		if(req.isAuthenticated()){
			res.redirect('/user/home');
		}
		next();
	},

	notLoggedIn: function(req, res, next){
		if(!req.isAuthenticated()){
			res.redirect('/user/login');
		}

		next();
	}
}