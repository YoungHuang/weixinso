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

exports.findOneById = function(id, callback){
    Post.findOne({_id: id}, callback);
};

exports.get = function(page, count, callback) {
  Post.count({}, function(err, total) {
    if (err) {
      return callback(err);
    }
    Post.find({}, null, {
      skip: (page -1) * count,
      limit: count
    }, function(err, postList) {
      if (err) {
        return callback(err);
      }
      callback(err, postList, total);
    });
  });
};

exports.update = function(id, post, callback) {
  Post.update({
    _id: id
  }, {
    $set : {
      title: post.title,
      link: post.link,
      summary: post.summary,
      tags: post.tags
    }
  }, function(err, post) {
    if(err){
      callback(err);
    } else{
      callback(err, post);
    }
  });
};