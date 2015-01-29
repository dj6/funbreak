var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
module.exports = function(app){	
	//pre handler req.session.user
	app.use(function(req,res,next){
		// if(req.session.user){ //中间件session
		// 	app.locals.user = req.session.user;//保存到本地常量里去,用于显示'欢迎您，user.name'
		// }
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});




	//Index
	app.get('/', Index.index);

	//User
	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/signin',User.showSignin);
	app.get('/signup',User.showlogup);
	app.get('/logout', User.logout);
	app.get('/admin/user/list', User.loginRequired,User.adminRequired,User.list);



	//Movie
	app.get('/admin/movie/update/:id',User.loginRequired,User.adminRequired, Movie.update);	
	app.post('/admin/movie/new',User.loginRequired,User.adminRequired, Movie.new);
//	admin add page enter file
	app.get('/admin/movie', User.loginRequired,User.adminRequired,Movie.add);
	//detail page
	app.get('/movie/:id', Movie.detail);
	//list page
	app.get('/admin/movie/list',User.loginRequired,User.adminRequired, Movie.list);
	//list remove movie
	app.delete('/admin/movie/delete',User.loginRequired,User.adminRequired,Movie.del);

	//Comment
	app.post('/user/comment',User.loginRequired,Comment.save)

};