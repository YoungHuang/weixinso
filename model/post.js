var mongodb = require('./mongodb'),
    Schema = mongodb.mongoose.Schema;

var postSchema = new Schema({
	title: {
	    type: String,
	    required: true
	},
	content: String,
	link: String,
	favs:  Number,
	createDate: Date
});

var Post = mongodb.mongoose.model("Post", postSchema);