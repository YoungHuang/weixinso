var fs = require('fs'),
    wxPublicUser = require('./../model/wxPublicUser');

exports.backupDB = function(req, res) {
	wxPublicUser.findAll(function(err, results) {
		if (err) {
			return res.redirect('/');
		}

		res.set('Content-Type', 'application/json');
		res.send(results);
	});
};

exports.restoreDB = function(req, res) {

};