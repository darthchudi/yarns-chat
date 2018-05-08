var User = require('../models/User');
var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
	getUser: function(req, res){
		var token = req.headers['x-access-token'];
		if(!token){
			return res.status(401).json({
				success: false,
				message: 'Token not found'
			});
		}

		jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
			User.findById(decoded.id, async (err, user)=>{
				if(err){
					return res.status(500).json({
						success: false,
						message: "The server seems to be down"
					})
				}

				if(!user){
					return res.status(404).json({
						success: false,
						message: "User not found"
					})
				}
				delete user.password;

				return res.status(200).json({
					success: true,
					user: user
				});

			})
		})
	}
}