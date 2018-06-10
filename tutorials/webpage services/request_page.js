/* IMPORT REQUIRED MODULEs */
/*********************************************/
var http = require('http');			/* to create web server */
var fs = require('fs');				/* to read webpage from disk */
var url = require('url');			/* to parse requested url */


/* CREATE WEB SERVER */
/*********************************************/
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;

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
	
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');