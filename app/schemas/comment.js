var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
	movie:{
		type: ObjectId,
		ref: "Movie"
	},
	from:{
		type: ObjectId,
		ref:'User'
	},
	to:{
		type: ObjectId,
		ref:'User'
	},
	content:String,
	// reply:[
	// 	{
	// 		from:{type:ObjectId,ref:"User"},
			 
	// 		content:String,
	// 	}
	// ],
	dateString: String,
	meta:{
		createAt:{
			default: Date.now(),
			type: Date
		},
		updateAt:{
			default: Date.now(),
			type: Date
		}
	}
});



CommentSchema.pre('save',function(next){
	var comment = this;
// change america's time zone into china's time zone
	var d = new Date();
	var local = d.getTimezoneOffset()/60;
	var local_mm = d.getTime();
	var delt = (local+8)*3600000;
	var add = local_mm + delt;
	var newDate = new Date(add);

	comment.meta.createAt = newDate;
	comment.meta.updateAt = newDate;
	var date,time;
	date = newDate.toLocaleDateString();
	time = newDate.toLocaleTimeString();
	console.log('formal time：'+time);
	comment.dateString = date+" "+time;
	next();
});


// CommentSchema.statics = {
// 	fetch: function(cb){
// 		return this
// 		.find({})
// 		.exec(cb);
// 	},
// 	findById: function(id,cb){
// 		return this
// 		.findOne({_id:id})
// 		.exec(cb);
// 	}
// }

module.exports = CommentSchema;