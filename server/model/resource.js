var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var resourceSchema = new Schema({

	type: {
		type: String, 
		default: 'document',
		enum: {
			values : ['link', 'file', 'document'], 
			message: 'Invalid resource type `{PATH}` with value `{VALUE}`'
		}
	},

	title : {
		type: String, 
		required: true, 
		trim: true
	}, 

	body : {
		type: String, 
	},
	
	source : String,
	
	author : {
		type : Schema.Types.ObjectId, 
		ref : 'User', 
		required : true
	},

	created:{
		type: Date, 
		default: Date.now, 
		required:true
	},

	updated:{
		type: Date
	}
}); 

mongoose.model('Resource', resourceSchema);  