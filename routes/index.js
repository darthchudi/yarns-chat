var express = require('express');
var router = express.Router();
router.get('/', 
	function(req, res, next){
		console.log("First Middleware called at "+req.time);
		next();
	}, 
	function(req, res){
		console.log("First Middleware called at "+req.time);
		res.send("Welcome to your express appz!");
	}
)

router.get('/api/test', (req, res)=>{
	res.json({
		status: 200,
		data: "The API works!"
	})
})

module.exports = router;
