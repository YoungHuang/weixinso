/**
 * Created by jiesun on 14-2-17.
 */
var fs = require('fs'),
    wxPublicUser = require('./../model/wxPublicUser');

exports.index = function(req, res){
  var id = req.params.wid;
  wxPublicUser.findByIndex(id, function(err, result){
    if(err){
      console.log(err);
    }else{
      res.render('wxuser/details', {
        title: '主页',
        wxPublicUser: result
      });
    }
  });
};

exports.generate = function(req, res){
  var i;
  for(i=0; i<20; i++){
    var weixinServer = {};
    weixinServer.name = '知名疯子';
    weixinServer.wxNumber = 'gh_c0b973c06195';
    weixinServer.createDate = '2012-10-09 16:54:34';
    weixinServer.logoPath = '/upload/logoPicture/123456self.jpg';
    weixinServer.qrPath = '/upload/qrPicture/123456qr.jpg';
    weixinServer.desc = '知名疯子，最好的正能量自媒体平台。由中央电视台《公益的力量》栏目媒体合作负责人小疯子运营。' +
      '每日分享自己读到看到或者大家推荐的好文、好书、好电影等，偶尔也和你疯言疯语，乐此不彼。';
    wxPublicUser.save(weixinServer);
  }

};

exports.create = function(req, res) {
  var date = new Date();
  var tmpLogoPath = req.files.logo.path;
  var tmpQrPath = req.files.qr.path;

console.log(req.files.logo);
  var targetLogoPath = 'pubilc/upload/logoPicture/' + req.files.logo.name;
  fs.renameSync(tmpLogoPath, targetLogoPath);
  fs.unlinkSync(tmpLogoPath);

  var targetQrPath = 'pubilc/upload/qrPicture/' + req.files.qr.name;
  fs.renameSync(tmpQrPath, targetQrPath);
  fs.unlinkSync(tmpQrPath);

  var user = {
    name: req.body.name,
    wxNumber: req.body.wxNumber,
    desc: req.body.desc,
    logoPath: '/upload/logoPicture/' + req.files.logo.name,
    qrPath: '/upload/qrPicture/' + req.files.qr.name,
    tags: [req.body.tag1, req.body.tag2, req.body.tag3],
    createDate: date
  };
  wxPublicUser.save(user, function(err, wxuser) {
    if (err) {
      return res.render('wxuser/create', {
        user: user
      });
    }
    res.redirect('/wxuser/detail/' + wxuser._id);
  });
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
        res.render('wxuser/results', {
          title: '主页',
          wxPublicUsers: result
        });
      }
    }
  );
};
