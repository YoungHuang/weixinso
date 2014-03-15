
/*
 * GET home page.
 */
var wxUser = require('../controller/wxUser'),
    operation = require('../controller/operation'),
    user = require('../controller/user'),
    post = require('../controller/post');

module.exports = function(app){
  app.get('/', function(req, res){
    wxUser.index(req, res);
  });

  app.get('/add', function(req, res){
    wxUser.generate(req, res);
  });

  app.get('/wxuser/details/:id',function(req, res){
    wxUser.details(req, res);
  });

  app.get('/wxuser/search', function(req, res){
    wxUser.search(req, res);
  });

  // 创建公众号
  app.get('/wxuser/create', function(req, res) {
    wxUser.showCreate(req, res);
  });
  app.post('/wxuser/create', function(req, res) {
    wxUser.create(req, res);
  });

  // 公众号详情
  app.get('/wxuser/show/:id', function(req, res) {
    wxUser.show(req, res);
  });

  // 删除公众号
  app.get('/wxuser/delete/:id', function(req, res) {
    wxUser.delete(req, res);
  });

  // 公众号列表
  app.get('/wxuser/list', function(req, res) {
    wxUser.list(req, res);
  });

  // 编辑公众号
  app.get('/wxuser/edit/:id', function(req, res) {
    wxUser.edit(req, res);
  });
  app.post('/wxuser/edit/:id', function(req, res) {
    wxUser.update(req, res);
  });

  // 创建用户
  app.get('/user/create', function(req, res) {
    user.showCreate(req, res);
  });
  app.post('/user/create', function(req, res) {
    user.create(req, res);
  });

  // 用户详情
  app.get('/user/show/:id', function(req, res) {
    user.show(req, res);
  });

  // 用户列表
  app.get('/user/list', function(req, res) {
    user.list(req, res);
  });

  // 编辑用户
  app.get('/user/edit/:id', function(req, res) {
    user.edit(req, res);
  });
  app.post('/user/edit/:id', function(req, res) {
    user.update(req, res);
  });

  // 删除用户
  app.get('/user/delete/:id', function(req, res) {
    user.delete(req, res);
  });

  // 新建文章
  app.get('/post/create/:wxid', function(req, res) {
    post.showCreate(req, res);
  });
  app.post('/post/create/:wxid', function(req, res) {
    post.create(req, res);
  });

  // 文章列表
  app.get('/post/list', function(req, res) {
    post.list(req, res);
  });

  // 文章详情
  app.get('/post/show/:id', function(req, res) {
    post.show(req, res);
  });

  // 编辑文章
  app.get('/post/edit/:id', function(req, res) {
    post.edit(req, res);
  });
  app.post('/post/edit/:id', function(req, res) {
    post.update(req, res);
  });

  // 删除文章
  app.get('/post/delete/:id', function(req, res) {
    post.delete(req, res);
  });

  // 数据管理
  app.get('/operation/backupdb', function(req, res) {
    operation.backupDB(req, res);
  });

  app.get('/operation/restoredb', function(req, res) {
    res.render('operation/restoredb', {});
  });

  app.post('/operation/restoredb', function(req, res) {
    operation.restoreDB(req, res);
  });

  app.get('/operation/downloadPics', function(req, res) {
    operation.downloadPics(req, res);
  });
}

