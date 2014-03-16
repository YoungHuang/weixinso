if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb2-2.4.8'][0]['credentials'];
} else if(process.env.IP) {
    var mongo = {
    "hostname":process.env.IP,
    "port":27017,
    "username":"",
    "password":"",
    "name":"",
    "db":"db"
    }
} else{
    var mongo = {
    "hostname":"localhost",
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

var host = '192.168.56.101';
if (process.env.VMC_APP_HOST) {
    host = process.env.VMC_APP_HOST;
} else if(process.env.IP) {
    host = process.env.IP;
}

var port = 3000;
if (process.env.VCAP_APP_PORT) {
    port = process.env.VCAP_APP_PORT;
} else if(process.env.PORT) {
    port = process.env.PORT;
}

var config = {
	cookieSecret: 'wx',
	db: 'db',
	host: host,
	port: port,
	mongourl: mongourl,
    downloadPicsName: 'public/upload.tar',
    downloadPicsCwd: 'public/upload',
    downloadPicsDest:'upload'
}

module.exports = config;
module.exports.config = config;