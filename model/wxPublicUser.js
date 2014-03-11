/**
 * Created by jiesun on 13-12-24.
 */

var mongodb = require('./mongodb'),
    mongoose = mongodb.mongoose,
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
    createDate: { 
      type: Date, 
      default: Date.now 
    }
});
var WxPublicUser = mongoose.model("WxPublicUser", WxPublicUserSchema);

exports.save = function(user, callback){
  var wxPublicUser = new WxPublicUser(user);

  wxPublicUser.save(function(err, user){
    if(err){
      console.log('Save failed');
      callback(err);
    }else{
      console.log('Save success');
      callback(err, user);
    }
  });
};

exports.update = function(id, user, callback) {
  WxPublicUser.update({
    _id: id
  }, {
    $set : {
      name: user.name,
      wxNumber: user.wxNumber,
      desc: user.desc,
      tags: user.tags
    }
  }, function(err, wxuser) {
    if(err){
      callback(err);
    } else{
      callback(err, wxuser);
    }
  });
};

exports.get = function(page, count, callback) {
  WxPublicUser.count({}, function(err, total) {
    if (err) {
      return callback(err);
    }
    WxPublicUser.find({}, null, {
      skip: (page -1) * count,
      limit: count
    }, function(err, wxuserList) {
      if (err) {
        return callback(err);
      }
      callback(err, wxuserList, total);
    });
  });
};

exports.findOneById = function(id, callback){
    WxPublicUser.findOne({_id: id}, callback);
};

exports.findAll = function(callback){
  WxPublicUser.find(callback);
};

exports.findByName = function(name, callback){
  WxPublicUser.find(name,callback);
};

exports.deleteOneById = function(id, callback){
  WxPublicUser.findByIdAndRemove(id, function(err) {
    if(err){
      callback(err);
    } else{
      callback(err);
    }
  });
};