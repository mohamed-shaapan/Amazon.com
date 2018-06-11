/* IMPORT REQUIRED MODULEs */
/*********************************************/
var http = require('http');						/* respond to http requests */
var url = require('url'); 						/* url parser */
var page_lookup = require('./page_lookup');		/* return required page path */
var page_opener = require('./page_opener');

/* SETUP A SERVER */
/*********************************************/
http.createServer(function (req, res) {

	/* parse requested url */
	var q = url.parse(req.url, true);
	var filename = page_lookup.get_path(q.pathname);

	/* load web-page from disk */
	page_opener.open(filename, res);

}).listen(8081);

/* if everything is okay */
/*********************************************/
console.log('Server running at http://127.0.0.1:8081/');
//console.log("mohamed" == "mohamed");