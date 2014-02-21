
/*
 * GET home page.
 */
var manager = require('./../server/bl/manager');

module.exports = function(app){
  app.get('/', function(req, res){
    manager.findAll(req, res);
  });

  app.get('/search', function(req, res){
//    manager.save(req, res);
    manager.index(req, res);
  });
}