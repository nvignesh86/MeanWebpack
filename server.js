var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var session = require('express-session');

var port = process.env.PORT || "3000";

var app = express();

//Set Static Folder
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'src')));

console.log(__dirname);
//View Engine
app.set('views',path.join(__dirname,'/server/views'));
app.set('view engine','ejs');                                                                                                                                                                                                                                                                                                                                                                                
app.engine('html',require('ejs').renderFile);

//app.set('trust proxy', 1);
//Set Session
/*app.use(session(
				{secret:"qwerty",
				resave:true,
				saveUninitialized: false,
  				cookie: { secure:false,
  						HttpOnly:true,}// secure:true for https // Need to verify
  				}
		));
*/
//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/*
app.all('*',function(req, res,next){
	 //req.headers['x-forwarded-proto'] = 'https';
	//console.log(req.path);
	//console.log(req.originalUrl);
	session = req.session;	
	if(session.user){
		next();
	}else if(req.path == "/login"){
		next();
	}else{
		res.redirect("login");
		//next();
	}
});

*/

app.use('/',require('./server/routes/index'));
app.use('/',require('./server/routes/login'));
app.use('/api',require('./server/routes/tasks'));




app.listen(port,function(){
	console.log("Server started on port "+port);
})
