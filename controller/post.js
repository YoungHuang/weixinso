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