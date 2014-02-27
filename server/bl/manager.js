/**
 * Created by jiesun on 14-2-17.
 */
var wxPublicUser = require('./../../model/wxPublicUser');

exports.index = function(req, res){
  var id = req.params.wid;
  wxPublicUser.findByIndex(id, function(err, result){
    if(err){
      console.log(err);
    }else{
      res.render('details', {
        title: '主页',
        wxPublicUser: result
      });
    }
  });
};

exports.save = function(req, res){
  var i;
  for(i=0; i<20; i++){
    var weixinServer = {};
    weixinServer.name = '知名疯子';
    weixinServer.primevalNumber = 'gh_c0b973c06195';
    weixinServer.simpleNumber = 'zhimingfengzi';
    weixinServer.webAddress = 'http://www.guodagongyi.com'
    weixinServer.keyWord = '公益 策划 营销 媒体 新媒体 聚微信 微信导航';
    weixinServer.type = '订阅号';
    weixinServer.recordDate = '2012-10-09 16:54:34';
    weixinServer.picturePath = '/upload/selfPicture/123456self.jpg';
    weixinServer.qrPath = '/upload/qrPicture/123456qr.jpg';
    weixinServer.desc = '知名疯子，最好的正能量自媒体平台。由中央电视台《公益的力量》栏目媒体合作负责人小疯子运营。' +
      '每日分享自己读到看到或者大家推荐的好文、好书、好电影等，偶尔也和你疯言疯语，乐此不彼。';
    wxPublicUser.save(weixinServer);
  }

};

exports.findAllForIndexPage = function(req, res){
  wxPublicUser.findAll(function(err, result){
    if(err){
      console.log(err);
    }else{
      res.render('index', {
        title: '主页',
        wxPublicUsers: result
      });
    }
   }
  );
};

exports.findByName = function(req, res){
  var name = req.body.publicStr.trim();
  var query={};
  if(name) {
    query['name']=new RegExp(name);
  }
  wxPublicUser.findByName(query, function(err, result){
      if(err){
        console.log(err);
      }else{
        res.render('results', {
          title: '主页',
          wxPublicUsers: result
        });
      }
    }
  );
};

