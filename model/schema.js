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
var WeiXinMode  = mongodb.mongoose.model('weixinserver');
exports.save = function(obj){
  var server = new WeiXinServer(obj);
  console.log('test11');
  server.save(function(err){
    if(err){
      console.log('Save failed');
    }else{
      console.log('Save success');
    }
  });
};

exports.findByIndex = function(id, callback){
    return WeiXinMode.find({id: id}, callback);
};



