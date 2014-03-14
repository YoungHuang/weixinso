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
	var wxusers = req.body.wxusers;
	var jsonObj = JSON.parse(wxusers);
	var succ = 0;
	for (var i = jsonObj.length - 1; i >= 0; i--) {
		var wxuser = jsonObj[i];

		wxPublicUser.save(wxuser, function(err) {
			if (err) {
				
			} else {
				succ++;
			}
		});
	}

	res.set('Content-Type', 'text/plain');
	res.send("restoreDB complete!");
};