
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

  app.get('/detail/:wid',function(req, res){
    wxUser.index(req, res);
  });

  app.post('/search', function(req, res){
    wxUser.findByName(req, res);
  });

  // 创建公众号
  app.get('/wxuser/create', function(req, res) {
    res.render('wxuser/create', {});
  });
  app.post('/wxuser/create', function(req, res) {
    wxUser.create(req, res);
  });

  // 公众号列表
  app.get('/wxuser/list', function(req, res) {

  });

  // 编辑公众号
  app.get('/wxuser/edit', function(req, res) {

  });
  app.post('/wxuser/edit', function(req, res) {
    
  });

  // 创建用户
  app.get('/user/create', function(req, res) {

  });
  app.post('/user/create', function(req, res) {
    
  });

  // 用户列表
  app.get('/user/list', function(req, res) {

  });

  // 编辑用户
  app.get('/user/edit', function(req, res) {

  });
  app.post('/user/edit', function(req, res) {
    
  });
}

