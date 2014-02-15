/**
 * Created by jiesun on 13-12-24.
 */

var mongoose = require('./mongodb'),
    Schema = mongoose.Schema;

var WxPublicUserSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: true
    },
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
    keyWord: String,
    recordDate: Date,
    desc: String
});
var WxPublicUser = mongoose.model("WxPublicUser", WxPublicUserSchema);

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
    return WxPublicUser.find({id: id}, callback);
};
