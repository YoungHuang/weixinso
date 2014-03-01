var mongodb = require('./mongodb'),
    Schema = mongodb.mongoose.Schema;

var userSchema = new Schema({
	name: {
	    type: String,
	    required: true
	},
	password: String,
	role: String,
	createDate: Date
});

var User = mongodb.mongoose.model("User", userSchema);