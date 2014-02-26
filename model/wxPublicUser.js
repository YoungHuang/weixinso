/**
 * Created by jiesun on 13-12-24.
 */

var mongodb = require('./mongodb'),
    Schema = mongodb.mongoose.Schema;

var WxPublicUserSchema = new Schema({
    name: String,
    picturePath: {
        type: String,
        required: true
    },
    qrPath: {
        type: String,
        required: true
    },
    primevalNumber: String,
    simpleNumber: String,
    type: String,
    webAddress: String,
    keyWord: String,
    recordDate: Date,
    desc: String
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

