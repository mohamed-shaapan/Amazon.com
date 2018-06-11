var fs = require('fs');							/* read files/pages from disk */

exports.open = function(filename, res)
{
	/* load web-page from disk */
	fs.readFile(filename, function(err, data) {
		// error handling
		if (err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			return res.end("404 Not Found");
		}  
		// send requested page
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
}