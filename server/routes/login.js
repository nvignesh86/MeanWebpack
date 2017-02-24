var express = require('express');
var router = express.Router();

router.get('/login', function(req,res,next){
	console.log("Login Called")	
	req.session.user = "Vicky";
	res.render('index.html',{page:'login'});
});
	
module.exports = router;
 