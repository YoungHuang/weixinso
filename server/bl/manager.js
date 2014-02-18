/**
 * Created by jiesun on 14-2-17.
 */
var schema = require('./../../model/schema');

exports.index = function(req, res){
//  var id = req.user.id;
  var id = "923456789";
  schema.findByIndex(id, function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
  });
};

exports.save = function(req, res){
  var weixinServer = {};
  weixinServer.id = '923456789';
  weixinServer.picturePath = '/opt/picture/selfPicture';
  weixinServer.qrPath = '/opt/picture/qrPicture';

  schema.save(weixinServer);
};
