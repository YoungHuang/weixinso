/**
 * Created by jiesun on 13-12-24.
 */

var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var WeiXinSoSchema = new Schema({
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
var WeiXinServer = mongodb.mongoose.model("weixinserver", WeiXinSoSchema);


exports.save = function(obj, callback){
  var server = new WeiXinServer(obj);
  server.save(function(err){
    if(err){
      callback(err);
      console.log('Save failed');
    }else{
      console.log('Save success');
    }
  });
};

exports.findByIndex = function(id, callback){
    var weiXinMode  = this.model("weixinserver");
    return weiXinMode.find({id: id}, callback);
};



