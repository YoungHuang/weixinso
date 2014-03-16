var mongodb = require('./mongodb'),
    Schema = mongodb.mongoose.Schema;

var userSchema = new Schema({
	name: {
	    type: String,
	    required: true
	},
	password: String,
	role: { 
		type: String, 
		default: 'normal' 
	},
	createDate: { 
		type: Date, 
		default: Date.now 
	}
});

var User = mongodb.mongoose.model("User", userSchema);

exports.save = function(u, callback){
  var user = new User(u);

  user.save(function(err, user){
    if(err){
      console.log('Save failed');
      callback(err);
    }else{
      callback(err, user);
    }
  });
};

exports.findOneById = function(id, callback){
    User.findOne({_id: id}, callback);
};

exports.findOneByName = function(name, callback){
    User.findOne({name: name}, callback);
};

exports.get = function(page, count, callback) {
  User.count({}, function(err, total) {
    if (err) {
      return callback(err);
    }
    User.find({}, null, {
      skip: (page -1) * count,
      limit: count
    }, function(err, userList) {
      if (err) {
        return callback(err);
      }
      callback(err, userList, total);
    });
  });
};

exports.deleteOneById = function(id, callback){
  User.findByIdAndRemove(id, function(err) {
    if(err){
      callback(err);
    } else{
      callback(err);
    }
  });
};

exports.update = function(id, user, callback) {
	var set = {
		name: user.name,
    role: user.role
	};
	if (user.password) {
		set.password = user.password;
	}
  User.update({
    _id: id
  }, {
    $set : set
  }, function(err, user) {
    if(err){
      callback(err);
    } else{
      callback(err, user);
    }
  });
};