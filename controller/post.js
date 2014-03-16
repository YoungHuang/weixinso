var postModel = require('../model/post'),
    wxPublicUser = require('../model/wxPublicUser');

exports.showCreate = function(req, res) {
  res.render('post/create', {
      title: '发布文章',
      post: {}
  });
}

exports.create = function(req, res) {
  var post = {
    title: req.body.title,
    link: req.body.link,
    summary: req.body.summary,
    tags: [req.body.tag1, req.body.tag2, req.body.tag3]
  };
  var wxid = req.params.wxid;
  wxPublicUser.findOneById(wxid, function(err, wxuser) {
    if(err){
      return res.render('post/edit', {
        post: post
      });
    }

    post.wxId = wxid;
    post.type = wxuser.type;
    postModel.save(post, function(err, post) {
      if (err) {
        return res.render('post/edit', {
          post: post
        });
      }
      res.redirect('/post/show/' + post._id);
    });
  });
};

exports.show = function(req, res) {
  var id = req.params.id;

  postModel.findOneById(id, function(err, post) {
    if(err){
      return res.redirect('/post/list');
    }

    res.render('post/show', {
      post: post
    });
  });
};

exports.list = function(req, res) {
  var page = req.query.p ? parseInt(req.query.p) : 1;
  var count = req.query.c ? parseInt(req.query.c) : 10;
  postModel.get(page, count, function(err, postList, total) {
    if(err){
      return res.redirect('/');
    }

    res.render('post/list', {
        posts: postList,
        page: page,
        isFirstPage: (page -1) == 0,
        isLastPage: ((page -1) * count + postList.length) == total
    });
  });
};

exports.edit = function(req, res) {
  var id = req.params.id;
  var page = req.query.p;

  postModel.findOneById(id, function(err, post) {
    if(err){
      return res.redirect('/post/list');
    }

    res.render('post/edit', {
      title: '编辑文章',
      page: page,
      post: post
    });
  });
}

exports.update = function(req, res) {
  var post = {
    title: req.body.title,
    link: req.body.link,
    summary: req.body.summary,
    tags: [req.body.tag1, req.body.tag2, req.body.tag3]
  };
  postModel.update(req.params.id, post, function(err, post) {
    if(err){
      return res.redirect('/post/list');
    }
    res.redirect('/post/show/' + req.params.id);
  });
}