/**
 * Created by jiesun on 14-2-17.
 */
var schema = require('./../../model/schema');

exports.index = function(req, res){
  var id = req.user.id;
  schema.findByIndex(id, function(err, result){
    if(err){
      console.log(err);
    }else{
      console.log(result);
    }
  });
};

exports.save = function(req, res){
  var user = req.user;
  schema.save(user, function(err){
    if(err){
      console.log(err);
      console.log('Save failed');
    }else{
      console.log('Save success');
    }
  });
};
