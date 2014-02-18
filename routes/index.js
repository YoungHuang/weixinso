
/*
 * GET home page.
 */
var manager = require('./../server/bl/manager');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', { title: '主页' });
  });
  app.get('/search', function(req, res){
    manager.index(req, res)
  });
}