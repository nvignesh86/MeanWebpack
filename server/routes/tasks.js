var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://vicky:vicky@ds153729.mlab.com:53729/my_automation');


//Get All Records
router.get('/tasks', function(req,res,next){
	db.tasks.find(function(err,result){
		if(err){
			res.send(err);
		}
		res.json(result);
	});
});


//Find one record
router.get('/tasks/:id',function(req,res,next){
	db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,result){
		if(err){
			res.send(err);
		}
		res.json(result);
	});
})

//Add record
router.post('/tasks',function(req,res,next){
	console.log('Add API');
	var tasks = req.body;
	if(!tasks.name || !tasks.age){
		res.status(400);
		res.json({
			"error":"Bad Data"
		});
	}else{
		db.tasks.save(tasks,function(err,result){
			if(err){
				res.send(err);
			}
			res.json(result);
		});
	}
});

router.delete('/tasks/:id',function(req,res,next){
	db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

router.put('/tasks/:id',function(req,res,next){
	var tasks = req.body;
	var updateContact = {};
	if(!tasks.name || !tasks.age){
		res.status(400);
		res.json({
			"error":"Bad Data"
		});
	}else{
		updateContact.name = tasks.name;
		updateContact.age = tasks.age;
		db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updateContact,{},function(err,result){
			if(err){
				res.send(err);
			}
			res.json(result);
		});
	}
});

//Get All Records with join two tables
router.get('/tasksjoin', function(req,res,next){
	db.tasks.aggregate(
		[{
			$lookup:{
				from:"details",
				localField:'_id',
				foreignField:'foreignkey',
				as:'alldetails'
			}

		}],function(err,result){
			if(err){
				res.send(err);
			}
			res.json(result);
		});
});

module.exports = router;
