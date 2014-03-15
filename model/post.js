var mongodb = require('./mongodb'),
    Schema = mongodb.mongoose.Schema,
    ObjectId = Schema.ObjectId;

var postSchema = new Schema({
	wxId: {
	    type: ObjectId,
	    required: true
	},
	title: {
	    type: String,
	    required: true
	},
	link: String,
	type: String,
	tags: {type: [String], index: true},
	summary: String,
	favs:  { 
		type: Number, 
		default: 0 
	},
	createDate: {
		type: Date, 
		default: Date.now 
	}
});

var Post = mongodb.mongoose.model("Post", postSchema);

exports.save = function(post, callback){
  var newPost = new Post(post);

  newPost.save(function(err, post){
    if(err){
      console.log('Save failed');
      callback(err);
    }else{
      callback(err, post);
    }
  });
};