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
	meta:{
		createAt:{
			default:Date.now(),
			type: Date
		},
		updateAt: {
			default: Date.now(),
			type: Date
		}
	}
});



module.exports = CommentSchema;