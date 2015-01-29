var Movie = require('../models/movie');
var User = require('../models/user');
var _ = require('underscore');
//var Index = require('../app/controllers/index');

module.exports.index = function (req, res)  {
		// var _user = req.session.user  //session中间件
		// if(_user){
		// 	app.locals.user = _user; //
		// }
		console.log('user in session:');
		console.log(req.session.user);
		Movie.fetch(function(err,movies){
			if(err){
				return console.log(err);
			}
			res.render('index', {
				title:'iMovie 首页',
				small:'电影概览',
				movies: movies});
			
		});
	};