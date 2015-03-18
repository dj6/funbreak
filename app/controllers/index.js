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

		// Movie.find({'type':'故事'},function(err,story){
		// 	if(err){
		// 		return console.log(err);
		// 	}
		// 	res.render('index', {
		// 		title:'iMovie 首页',
		// 		small:'电影概览',
		// 		movies: story});
			
		// });

		Movie.fetch(function(err,movies){
			if(err){
				return console.log(err);
			}
			global.movies = movies;  
			// 保存链接方便其他页面调用 movie.js module.exports.detail 
			res.render('index', { 
				title:'funbreak 首页',
				small:'概览',
				movies: movies});
			
		});
	};