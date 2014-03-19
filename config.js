if(process.env.VCAP_SERVICES){
	console.log(process.env.VCAP_SERVICES);
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb2-2.4.8'][0]['credentials'];
}
else{
    var mongo = {
    "hostname":"192.168.56.102",
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"db"
    }
}
var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}
var mongourl = generate_mongo_url(mongo);

var config = {
	cookieSecret: 'wx',
	db: 'db',
	host: 'localhost',
	mongourl: mongourl,
  downloadPicsName: 'public/upload.tar',
  downloadPicsCwd: 'public/upload',
  downloadPicsDest:'upload'
}

module.exports = config;
module.exports.config = config;