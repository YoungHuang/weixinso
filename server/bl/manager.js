/**
 * Created by jiesun on 14-2-17.
 */
var wxPublicUser = require('./../../model/wxPublicUser');

exports.index = function(req, res){
//  var id = req.user.id;
  var id = "923456789";
  wxPublicUser.findByIndex(id, function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
  });
};

exports.save = function(req, res){
  var i;
  for(i=0; i<20; i++){
    var weixinServer = {};
    weixinServer.id = '123456';
    weixinServer.name = '知名疯子';
    weixinServer.picturePath = '/upload/selfPicture/123456self.jpg';
    weixinServer.qrPath = '/upload/qrPicture/123456qr.jpg';
    wxPublicUser.save(weixinServer);
  }

};

exports.findAll = function(req, res){
  wxPublicUser.findAll(function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
      res.render('index', {
        title: '主页',
        wxPublicUsers: result
      });
    }
   }
  );
}