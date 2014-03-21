
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('./config');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(express);

var app = express();

// all environments
app.set('host', config.host);
app.set('port', config.port);
app.use(express.logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.json());
app.use(express.bodyParser({keepExtensions: true, uploadDir: './public/upload'}));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret: config.cookieSecret,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
	store: new MongoStore({
		url: config.mongourl
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), app.get('host'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
