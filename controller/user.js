var crypto = require('crypto'),
    userModel = require('../model/user');

var roles = ['admin', 'normal'];

exports.showLogin = function(req, res) {
  res.render('user/login', { });
}

exports.login = function(req, res) {
  var name = req.body.name,
      password = req.body.password;

  var md5 = crypto.createHash('md5');
  password = md5.update(password).digest('hex');

  userModel.findOneByName(name, function(err, user) {
    if (err) {
      req.flash('error', '用户不存在！');
      return res.redirect('user/login');
    }
    if (user.password != password) {
      req.flash('error', '密码错误！');
      return res.redirect('user/login');
    }
    req.session.user = user;
    req.flash('success', '登陆成功！');
    res.redirect('/');
  });
}

exports.showCreate = function(req, res) {
  res.render('user/create', {
      title: '创建用户',
      roles: roles,
      user: {}
  });
}

exports.create = function(req, res) {
  var name = req.body.name,
      password = req.body.password,
      password_re = req.body['password-repeat'];

  if (password != password_re) {
    req.flash('error', '两次输入的密码不一致');
    return res.redirect('user/list');
  }

  var md5 = crypto.createHash('md5'),
    password = md5.update(password).digest('hex');

  var user = {
    name: req.body.name,
    password: password,
    role: req.body.role
  };
  userModel.save(user, function(err, user) {
    if (err) {
      return res.render('user/edit', {
        user: user
      });
    }
    res.redirect('user/show/' + user._id);
  });
};

exports.show = function(req, res) {
  var id = req.params.id;

  userModel.findOneById(id, function(err, user) {
    if(err){
      return res.redirect('/user/list');
    }

    res.render('user/show', {
      user: user
    });
  });
};

exports.list = function(req, res) {
  var page = req.query.p ? parseInt(req.query.p) : 1;
  var count = req.query.c ? parseInt(req.query.c) : 10;
  userModel.get(page, count, function(err, userList, total) {
    if(err){
      return res.redirect('/');
    }

    res.render('user/list', {
        users: userList,
        page: page,
        isFirstPage: (page -1) == 0,
        isLastPage: ((page -1) * count + userList.length) == total
    });
  });
};

exports.delete = function(req, res) {
  var id = req.params.id;
  var page = req.query.p;

  userModel.deleteOneById(id, function(err) {
    res.redirect('/user/list?p=' + page);
  });
};

exports.edit = function(req, res) {
  var id = req.params.id;
  var page = req.query.p;

  userModel.findOneById(id, function(err, user) {
    if(err){
      return res.redirect('/user/list');
    }

    res.render('user/edit', {
      title: '编辑用户',
      page: page,
      user: user,
      roles: roles
    });
  });
}

exports.update = function(req, res) {
  var user = {
    name: req.body.name,
    role: req.body.role
  };

  var password = req.body.password,
      password_re = req.body['password-repeat'];

  if (password) {
    if (password != password_re) {
      req.flash('error', '两次输入的密码不一致');
      return res.redirect('user/list');
    }

    var md5 = crypto.createHash('md5'),
      password = md5.update(password).digest('hex');

    user.password = password;
  }

  userModel.update(req.params.id, user, function(err, user) {
    if(err){
      return res.redirect('/user/list');
    }
    res.redirect('/user/show/' + req.params.id);
  });
}