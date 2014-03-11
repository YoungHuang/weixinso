var mongodb = require('./mongodb'),
    Schema = mongodb.mongoose.Schema,
    ObjectId = Schema.ObjectId;

var postSchema = new Schema({
	wxId: ObjectId,
	title: {
	    type: String,
	    required: true
	},
	summary: String,
	link: String,
	favs:  Number,
	createDate: { 
		type: Date, 
		default: Date.now 
	}
});

var Post = mongodb.mongoose.model("Post", postSchema);