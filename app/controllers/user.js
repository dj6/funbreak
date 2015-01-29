var User = require('../models/user');

module.exports.signup = function(req,res){
		//console.log('get in sign up' + user);
		var _user = req.body;
		console.log(_user);
		User.findOne({name: _user.name},function(err, user){
			if(err) return console.log(err);
			console.log('find user + '+ _user? 'yes':'no');
			if(user) {
				console.log('find the same guy'+user);
				res.redirect('/signin');


			}
			else{
				var user = new User({
				name: _user.name,
				password: _user.password
				});
				//console.log("FINAL RESULET +"+_user.saveSalt());
				user.save(function(err,user){
				if(err) return console.log('user sign up '+err);
				console.log("success add user "+user );
				res.redirect('/admin/userlist');
				});
			}
		});	
	};

module.exports.showSignin = function(req,res){
	res.render('signin',{
		title:'用户登录',
		small:'imovie'
	});
};

module.exports.showlogup = function(req,res){
	console.log('show sign up');
	res.render('signup',{
		title :'用户注册',
		small: 'imovie'
	});
//	res.redirect('/admin/userlist');
};

module.exports.showSignup = function(req,res){

};

module.exports.signin = function(req,res){
		var _user = req.body;
		var _name = _user.name;
		var _password = _user.password;
		if(_name){
			User.findOne({name:_name},function(err,user){
				if(err) return console.log(err);
				if(!user){
					console.log('no such user');
					return res.redirect('/signup');
				}
				user.comparePassword(_password,function(err,isMatched){
					if(err) return console.log(err);
					if(isMatched) {
						req.session.user = user;
						console.log('password match');
						res.redirect('/');
					}else{
						res.redirect('/signin');
						console.log('password not match');
					}
				});			
			});

		}
		else{
			console.log('error! req.body does not exist');
		}
		
		
	};	


module.exports.logout = function(req,res){
	   if(req.session.user != undefined){
	   	delete req.session.user;
	   }
		
	//	delete app.locals.user; 
		//Delete in Javascript is used to remove properties from an object. 
		//If that property references an object, the object isn't deleted,
		// but if there are no more references to it, then it should be cleaned up on the next garbage collection cycle.
		res.redirect('/');
	};	

module.exports.list = function(req,res){
		User.fetch(function(err,users){
			if(err) return console.log(err);
			res.render('userlist',{
				title:'imovie 用户列表页',
				small: '全部用户',
				users:users});
		});

	};	


module.exports.loginRequired = function(req,res,next){
	var user = req.session.user;
	if(!user){
		return res.redirect('/');
	}
	next();

};	

module.exports.adminRequired = function(req,res,next){
	var user = req.session.user;
	if(user.role <= 50){
		return res.redirect('/');
	}
	next();
};