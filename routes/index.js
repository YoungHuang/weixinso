
/*
 * GET home page.
 */
var manager = require('./../server/bl/manager');

module.exports = function(app){
  app.get('/', function(req, res){
    manager.findAllForIndexPage(req, res);
  });

  app.get('/add', function(req, res){
    manager.save(req, res);
  });

  app.get('/detail/:wid',function(req, res){
    manager.index(req, res);
  });

  app.post('/search', function(req, res){
    manager.findByName(req, res);
  });
}

