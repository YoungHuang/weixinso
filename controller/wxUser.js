var fs = require('fs'),
    wxPublicUser = require('./../model/wxPublicUser');

var types = ['科技', '社会', '生活', '财经', '文艺'];

exports.details = function(req, res){
  var id = req.params.id;
  wxPublicUser.findOneById(id, function(err, wxuser) {
    if(err) {
      return res.redirect('/');
    }
    
    res.render('wxuser/details', {
      wxPublicUser: wxuser
    });
  });
};

exports.list = function(req, res) {
  var page = req.query.p ? parseInt(req.query.p) : 1;
  var count = req.query.c ? parseInt(req.query.c) : 10;
  wxPublicUser.get(page, count, function(err, wxuserList, total) {
    if(err){
      return res.redirect('/');
    }

    res.render('wxuser/list', {
        wxusers: wxuserList,
        page: page,
        isFirstPage: (page -1) == 0,
        isLastPage: ((page -1) * count + wxuserList.length) == total
    });
  });
};

exports.showCreate = function(req, res) {
  res.render('wxuser/create', {
      title: '创建微信公众号',
      types: types,
      user: {}
  });
}

exports.create = function(req, res) {
  var logoPath = req.files.logo.path;
  var qrPath = req.files.qr.path;

  logoPath = '/upload' + logoPath.substring(logoPath.lastIndexOf('/'));
  qrPath = '/upload' + qrPath.substring(qrPath.lastIndexOf('/'));

  var user = {
    name: req.body.name,
    wxNumber: req.body.wxNumber,
    type: req.body.type,
    desc: req.body.desc,
    logoPath: logoPath,
    qrPath: qrPath,
    tags: [req.body.tag1, req.body.tag2, req.body.tag3]
  };
  wxPublicUser.save(user, function(err, wxuser) {
    if (err) {
      return res.render('wxuser/edit', {
        user: user
      });
    }
    res.redirect('/wxuser/show/' + wxuser._id);
  });
};

exports.show = function(req, res) {
  var id = req.params.id;

  wxPublicUser.findOneById(id, function(err, wxuser) {
    if(err){
      return res.redirect('/wxuser/list');
    }

    res.render('wxuser/show', {
      wxPublicUser: wxuser
    });
  });
};

exports.delete = function(req, res) {
  var id = req.params.id;
  var page = req.query.p;

  wxPublicUser.deleteOneById(id, function(err) {
    res.redirect('/wxuser/list?p=' + page);
  });
};

exports.edit = function(req, res) {
  var id = req.params.id;
  var page = req.query.p;

  wxPublicUser.findOneById(id, function(err, wxuser) {
    if(err){
      return res.redirect('/wxuser/list');
    }

    res.render('wxuser/edit', {
      title: '编辑微信公众号',
      page: page,
      user: wxuser,
      types: types
    });
  });
}

exports.update = function(req, res) {
  var wxuser = {
    name: req.body.name,
    wxNumber: req.body.wxNumber,
    type: req.body.type,
    desc: req.body.desc,
    tags: [req.body.tag1, req.body.tag2, req.body.tag3]
  };
  wxPublicUser.update(req.params.id, wxuser, function(err, wxuser) {
    if(err){
      return res.redirect('/wxuser/list');
    }
    res.redirect('/wxuser/show/' + req.params.id);
  });
}

exports.index = function(req, res){
  wxPublicUser.getByGroup(function(err, results) {
    if (err) {
      console.log(err);
    } else {
      var wxUserGroups = {};
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var type = result._id;
        var wxUsers = [];
        if (result.value.wxusers) {
          wxUsers = result.value.wxusers;
        } else {
          wxUsers.push(result.value);
        }
        wxUserGroups[type] = wxUsers;
      }

      res.render('index', {
        wxUserGroups: wxUserGroups
      });
    }
  });
};

exports.search = function(req, res){
  var keywords = req.query.keywords.trim();
  var query = {};
  if(keywords) {
    query['name'] = new RegExp(keywords);
  }

  var page = req.query.p ? parseInt(req.query.p) : 1;
  var count = req.query.c ? parseInt(req.query.c) : 12;
  wxPublicUser.findByName(query, page, count, function(err, wxuserList, total) {
    if(err){
      return res.redirect('/');
    }

    res.render('wxuser/results', {
        wxUsers: wxuserList,
        page: page,
        keywords: keywords,
        isFirstPage: (page -1) == 0,
        isLastPage: ((page -1) * count + wxuserList.length) == total
    });
  });
};

exports.generate = function(req, res){
  var i;
  for(i=0; i<20; i++){
    var weixinServer = {};
    weixinServer.name = '知名疯子';
    weixinServer.type = '财经';
    weixinServer.wxNumber = 'gh_c0b973c06195';
    weixinServer.createDate = '2012-10-09 16:54:34';
    weixinServer.logoPath = '/upload/logoPicture/123456self.jpg';
    weixinServer.qrPath = '/upload/qrPicture/123456qr.jpg';
    weixinServer.tags = ['媒体', '杂文', '']
    weixinServer.desc = '知名疯子，最好的正能量自媒体平台。由中央电视台《公益的力量》栏目媒体合作负责人小疯子运营。' +
      '每日分享自己读到看到或者大家推荐的好文、好书、好电影等，偶尔也和你疯言疯语，乐此不彼。';
    wxPublicUser.save(weixinServer, function() {

    });
  }

};
