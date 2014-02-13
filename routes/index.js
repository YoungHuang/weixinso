
/*
 * GET home page.
 */
var schema = require('./../model/schema');

module.exports = function(app){
  //save to mongodb
  var movie = {};
  movie.id = '123456789';
  movie.name = 'Test ++ Test';
  schema.save(movie);
  app.get('/', function(req, res){
     console.log('get / ....');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello World</h1>');
    res.end();
  })
}