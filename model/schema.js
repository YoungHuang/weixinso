/**
 * Created by jiesun on 13-12-24.
 */

var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var mySchema = new Schema({
  id    : String,
  name  : String
});

var Movie = mongodb.mongoose.model("Movie", mySchema);

exports.save = function(obj, callback){
  var movie = new Movie(obj);
  movie.save(function(err){
    if(err){
      callback(err);
      console.log('Save failed');
    }else{
      console.log('Save success');
    }
  });
}



