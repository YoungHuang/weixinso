
/*
 * GET home page.
 */
var wxUser = require('./../controller/wxUser');

module.exports = function(app){
  app.get('/', function(req, res){
    wxUser.findAllForIndexPage(req, res);
  });

  app.get('/add', function(req, res){
    wxUser.generate(req, res);
  });

  app.get('/wxuser/details/:id',function(req, res){
    wxUser.details(req, res);
  });

  app.post('/wxuser/search', function(req, res){
    wxUser.search(req, res);
  });

  // 创建公众号
  app.get('/wxuser/create', function(req, res) {
    res.render('wxuser/create', {
      title: '创建微信公众号',
      user: {}
    });
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

  });
  app.post('/user/create', function(req, res) {
    
  });

  // 用户详情
  app.get('/user/show/:id', function(req, res) {

  });

  // 用户列表
  app.get('/user/list', function(req, res) {

  });

  // 编辑用户
  app.get('/user/edit', function(req, res) {

  });
  app.post('/user/edit', function(req, res) {
    
  });

  // 删除用户
  app.get('/user/delete/:id', function(req, res) {

  });
}

