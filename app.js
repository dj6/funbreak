var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var morgan =require('morgan');//express.logger

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var http = require('http'); 
var cheerio = require('cheerio');

var port = process.env.PORT || 3000; 
var app = express();
var dbUrl = 'mongodb://localhost/imovie';

mongoose.connect(dbUrl);
app.locals.moment = require("moment");
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));//把post请求变为对象   

app.use(cookieParser());
app.use(session({
	secret : 'imovie',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	}),
	resave: false,
	saveUninitialized: true
}));

if('development' === app.get('env')){  //根据不同情境有不同处理
	app.set('showStackError',true);     //显示报错
	app.use(morgan('tiny')); //设置报错格式
	app.locals.pretty = true; //设置代码缩进 
}

require('./config/routes')(app);

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public'))); //其他文件引用js文件、lib文件的根目录
app.listen(port);
console.log("current dir "+ __dirname);
console.log('ok '+port); 



// http.get('http://v.163.com/movie/2015/1/U/7/MAFVGR8PR_MAFVL3AU7.html',function(res){
// 	var data="";
// 	//console.log('in');
// 	res.on('data',function(chunk){
// 		data += chunk;
// 		//console.log(chunk);
// 	});
// 	res.on('end',function(){
// 		console.log('get data');
// 				var $ = cheerio.load(data);
// 		console.log('yes!');
// 		$("script").each(function(i,e){
// 			console.log(i);
// 			console.log($(this).html());
// 		});
		
// 	});
// 	//console.log(data);
// });




