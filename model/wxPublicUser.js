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

exports.save = function(user){
  var wxPublicUser = new WxPublicUser(user);

  wxPublicUser.save(function(err){
    if(err){
      console.log('Save failed');
    }else{
      console.log('Save success');
    }
  });
};

exports.findByIndex = function(id, callback){
    return WxPublicUser.find({_id: id}, callback);
};

exports.findAll = function(callback){
  return WxPublicUser.find(callback);
};

exports.findByName = function(query, callback){
  return WxPublicUser.find(query,callback);
};