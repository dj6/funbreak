var User = require('../models/user');
var localhost = "localhost:3000";
module.exports.signup = function(req,res){
		var _user = req.body;
		console.log('ori'+req.originalUrl);

		User.findOne({email: _user.email},function(err, user){
			if(err) return console.log(err);
			console.log('find user + '+ user? 'yes':'no');
			if(user) {
				console.log('find the email guy'+user);
				res.json({error:"邮箱已被注册！"});
			// res.redirect('/signin');
			}
			else{

					User.findOne({name:_user.name},function(err,user){
						if(err) return console.log(err);
						console.log('find user name'+ user? 'yes':'no');
						if(user){
							console.log('find the name guy'+user);
							res.json({error:"昵称已被注册！"});
						}else{
							var user = new User({
							name: _user.name,
							email: _user.email,
							password: _user.password
							});
							//console.log("FINAL RESULET +"+_user.saveSalt());
							user.save(function(err,user){
							if(err) return console.log('user sign up '+err);
							console.log("success add user "+user );
							console.log(localhost+req.originalUrl);
							res.json({error:"pass",
								user:user
							});
							// res.redirect(localhost+req.originalUrl);
							});
						}
						
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
		var _email = _user.email;
		var _password = _user.password;

		if(_email){
			User.findOne({email:_email},function(err,user){
				if(err) return console.log(err);
				if(!user){
					console.log('no such user');
					return res.json({error:"邮箱不存在！"});
				}
				user.comparePassword(_password,function(err,isMatched){
					if(err) return console.log(err);
					if(isMatched) {
						req.session.user = user;
						console.log('password match');
						res.json({error:"pass"});

					}else{
						res.json({error:"密码错误！"});
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