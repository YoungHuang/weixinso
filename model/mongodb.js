/**
 * Created by jiesun on 13-12-24.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.56.102/test');
exports.mongoose = mongoose;