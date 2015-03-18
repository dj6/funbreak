var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
	title:String,
	summary:String,
	flash:String,
	poster:String,
	type:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
		
	}

});


//每次调用save方法之前，都调用这个方法
MovieSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
});

//静态方法，model即可调用
MovieSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		.exec(cb);
	},
	findById: function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb);
	}
}

module.exports = MovieSchema;