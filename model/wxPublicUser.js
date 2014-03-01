/**
 * Created by jiesun on 13-12-24.
 */

var mongodb = require('./mongodb'),
    Schema = mongodb.mongoose.Schema;

var WxPublicUserSchema = new Schema({
    name: String,
    wxNumber: String,
    desc: String,
    logoPath: {
        type: String,
        required: true
    },
    qrPath: {
        type: String,
        required: true
    },
    tags: {type: [String], index: true},
    createDate: Date
});
var WxPublicUser = mongodb.mongoose.model("WxPublicUser", WxPublicUserSchema);

exports.save = function(user, callback){
  var wxPublicUser = new WxPublicUser(user);

  wxPublicUser.save(function(err, user){
    if(err){
      console.log('Save failed');
      callback(err);
    }else{
      callback(err, user);
    }
  });
};

exports.findOneById = function(id, callback){
    return WxPublicUser.findOne({_id: id}, callback);
};

exports.findAll = function(callback){
  return WxPublicUser.find(callback);
};

exports.findByName = function(query, callback){
  return WxPublicUser.find(query,callback);
};