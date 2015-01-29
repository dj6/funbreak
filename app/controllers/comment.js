var Comment = require('../models/comment');


module.exports.save = function(req,res){
	var _comment = req.body;
	var comment = new Comment({
		movie: _comment.movie,
		from : _comment.from,
		content: _comment.content
	});

	comment.save(function(err,comment){
		if(err) return console(err);
		console.log('add comment success' +comment);
		res.redirect('/movie/'+_comment.movie);
	});
};