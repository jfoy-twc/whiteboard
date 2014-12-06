var Schema = mongo.Schema; 
var tagSchema = new Schema({
	title : {
		type: String, 
		required: true,
		trim:true,
		lowercase:true,
        unique: true
	}, 
	description : {
		type: String, 
		required : false, 
		trim : true
	}, 
	verified : {
		type:Boolean, 
		default:false
	}, 
	popularity : {
		type: Number,
		default : 1,
		required: true
	}, 
	created:{
		type: Date, 
		default: Date.now, 
		required:true
	}
}); 

var textSearch = require("mongoose-text-search");
tagSchema.plugin(textSearch);
tagSchema.index({
    title: "text",
    description: "text"
}, {
    name: "tag_best_match_index",
    weights: {
        title: 5
    }
});
tagSchema.set('autoIndex', true);
mongo.model('Tag', tagSchema); 