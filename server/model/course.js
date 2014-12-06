var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var courseSchema = new Schema({
	
	code:{
		type: String,
		required: true,
		trim: true,
		index : true,
		lowercase: true,
		unique : true
	},

	title : {
		type: String, 
		required: true, 
		trim: true,
		index : true
	}, 

	description : {
		type: String, 
		trim: true
	},

	period : {
		season:String,
		year:Number
	},

	frontpage: String,

	author :{
		type : Schema.Types.ObjectId, 
		ref : 'User'
	},
	 
	managers : [{
		type : Schema.Types.ObjectId, 
		ref : 'User'
	}],
	resources: [{
		type : Schema.Types.ObjectId, 
		ref : 'Resource'
	}],
	subscribers : [String],
	created:{
		type: Date, 
		default: Date.now, 
		required:true
	},

	updated:{
		type: Date
	}
}); 

var textSearch = require("mongoose-text-search");
courseSchema.plugin(textSearch);
courseSchema.index({
    title: "text"
}, {
    name: "best_match_index",
    weights: {
        title: 5
    }
});
courseSchema.set('autoIndex', true);
mongoose.model('Course', courseSchema);  