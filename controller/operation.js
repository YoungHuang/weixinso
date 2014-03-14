var fs = require('fs'),
		zlib = require('zlib'),
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

exports.downloadPics = function(req, res) {
	var gzip = zlib.createGzip();
	var inp = fs.createReadStream('pubic/upload');
	// var out = fs.createWriteStream('pics.gz');

	console.log(fs.existsSync('public/upload'));
	// inp.pipe(gzip).pipe(out);

	res.send("downloadPics complete!");
};