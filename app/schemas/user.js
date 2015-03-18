var mongoose = require('mongoose');
var SALT_WORK_FACTOR = 10;
//var bcrypt = require('bcrypt');//生成随机盐，将这个随机盐和用户输入的密码联合加密。
var UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  email:{
  	unique:true,
  	type: String
  },
  password: String,
  // 0: nomal user
  // 1: verified user
  // 2: professonal user
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save',function(next){
	var user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

//before formal-bcrypt
	// bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		
	// 	if(err) return next(err);
	// 	bcrypt.hash(user.password,salt,function(err,hash){
	// 		console.log("add salt");
	// 		if(err) return next(err);
	// 		user.password = hash;
	// 		console.log('salt added password '+user.password);
	// 		next();
	// 	});
	// });
//end

//after simple password
	next();
//end	

});

UserSchema.statics = {
	fetch : function(cb){
		return this
		.find({})
		.exec(cb);
	},
	findById : function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb); //执行回调函数
	}
};

UserSchema.methods = {
 comparePassword : function(_password,cb){
 	//console.log(_password);

//before 	
	// bcrypt.compare(_password,this.password,function(err,ismatched){
	// if(err) return cb(err);		
 // 		cb(null,ismatched);
 // 	});

//end


//after
 	var ismatched = false;
    if(_password == this.password) ismatched = true;
    cb(null,ismatched);
//end 
 }
}
module.exports = UserSchema;