var Schema = mongo.Schema; 
var userSchema = new Schema({
	name : {
        type: String, 
        required: true,
      	trim: true
    },  

	status : {
		type: String,
		default: 'Teacher',
		enum: {
			values : 'Admin Student Teacher'.split(' '), 
			message: 'Invalid user type `{PATH}` with value `{VALUE}`'
		}
	},

	email : {
		type: String, 
		required: true,
		trim: true,
		lowercase: true,
		index: {
        	unique: true
        }
	}, 
	bio:String,
	salt : {
		type: String,
		required: true
	}, 
	hash : {
		type: String,
		required: true
	},

	phone : {
		type: String,
		trim: true
	}, 

	homepage : {
		type: String,
		trim: true
	}, 

	created : {
		type: Date, 
		default: Date.now,
		required: true
	}, 

	picture : {
		type: String, 
		trim: true, 
		lowercase: true
	}
}); 

module.exports = mongo.model('User', userSchema);