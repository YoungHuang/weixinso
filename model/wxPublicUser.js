/**
 * Created by jiesun on 13-12-24.
 */

var mongodb = require('./mongodb'),
    mongoose = mongodb.mongoose,
    Schema = mongodb.mongoose.Schema;

var WxPublicUserSchema = new Schema({
    name: String,
    wxNumber: String,
    type: String,
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

exports.findByName = function(query, page, count, callback){
  WxPublicUser.count(query, function(err, total) {
    if (err) {
      return callback(err);
    }
    WxPublicUser.find(query, null, {
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

exports.deleteOneById = function(id, callback){
  WxPublicUser.findByIdAndRemove(id, function(err) {
    if(err){
      callback(err);
    } else{
      callback(err);
    }
  });
};

exports.getByGroup = function(callback) {
  var o = {};
  o.map = function () { emit(this.type, this) };
  o.reduce = function(key, values) {
    var res =[];
    var len = values.length;
    if (len > 12) {
      len = 12;
    }

    for(var i=0; i < len; i++) {
      res.push(values[i]);
    }

    return {wxusers: res};
  };
  WxPublicUser.mapReduce(o, function (err, results) {
    callback(err, results);
  });
}
