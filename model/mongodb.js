var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongourl);

exports.mongoose = mongoose;