/* IMPORT REQUIRED MODULEs */
/*********************************************/
var path = require("path");
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* INTERFACE FUNCTIONS */
/*********************************************/
exports.handle_routes = function(server, database, directory_table)
{
	// refresh home page
	server.get('/home/refresh_table', function (req, res) {
		// Prepare output in JSON format
		var entry = {
			isbn: "123456",
			title : "Alice I Wonderland",
			author: "mohamed shaapan",
			publisher : "Pearson",
			category : "fantasy",
			price : "180.00",
			year : "1880"

		};
		var response = [entry];
		console.log(response);
		res.end(JSON.stringify(response));
	});

}