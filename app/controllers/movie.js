var _ = require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/comment');


module.exports.update = function(req,res){
		var id=req.params.id;
		console.log("admin update id "+id);
		if(id){
			Movie.findById(id,function(err,movie){
				if(err){
					return console.log("updateError "+err);
				}
				res.render('admin',{
					title:'imovie 电影更新页面' ,
					small:movie.title,
					movie:movie
				});
			});
		}
	};

module.exports.add = function (req, res)  {
		res.render('admin', {
			title:'iMovie 后台管理',
			small:'插入电影',
			movie: {
				_id:'',
				title: ' ',
				doctor: ' ',
				country: ' ',
				year: ' ',
				language: ' ',
				summary: ' ',
				poster: ' ',
				flash: ' '
			}
		});
	};

module.exports.new = function(req,res){
	    //console.log(req.body._id);
		var id = req.body._id;               //判断是否是新记录
		var movieObj = req.body;
		var _movie;

		if(id){
			Movie.findById(id,function(err,movie){
				if(err){
					console.log(err);
				}else{
					_movie = _.extend(movie,movieObj);
					_movie.save(function(err,movie){
						if(err){console.log(err);}
						else{
							res.redirect('/movie/'+movie._id);
						}
					});
				}
			});
		}
		else{
			_movie = new Movie({
							
				// director:'张艺谋 ',
				// title:"归来",
				// country:"中国",
				// language:"中文",
				// year:2014,
				// poster:"www.baidu.com",
				// summary:"sdfsss",
				// flash:"dsfdsf"

				director:movieObj.director,
				title:movieObj.title,
				country:movieObj.country,
				language:movieObj.language,
				year:movieObj.year,
				poster:movieObj.poster,
				summary:movieObj.summary,
				flash:movieObj.flash
			});
			console.log(_movie);
			_movie.save(function(err,movie){
				if(err){console.log(err);}
				else{
					res.redirect('/movie/'+movie._id);
				}
			});


		}

	};	

module.exports.detail = function (req, res)  {
		var id = req.params.id;
		Movie.findById(id,function(err,movie){
			if(err){
				return console.log(err);
			}
			Comment.find({movie: id})
			//.populate("from","name")
			.populate("from")
			.exec(function(err,comments){
				if(err) return console.log(err);
				console.log(comments+"null or?");
				res.render('detail', {
				title: 'iMovie 影片详情页' ,
				small:movie.title,
				movie: movie,
				movies: global.movies,
				// 从index中来
				comments: comments});
			});


			
		});
	};

module.exports.list = function (req, res)  {
		Movie.fetch(function(err,movies){
			if(err){
				return console.log(err);
			}
			res.render('list', {
				title:'iMovie 后台显示页',
				small:'电影列表',
				movies: movies});
		});
	};

module.exports.del = function(req,res){
		var id = req.query.id;
		if(!id){
			return console.log("id is null or undefined "+_id);
		}
		else{		
			Movie.remove({_id:id},function(err,movie){
				console.log(err);
				if(err)
					{   
						return console.log("delete error "+err);
					}
			});
		}
		res.json({success: 1});
	};		