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
		var sql_query = "SELECT * FROM Book;";
		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('Book Title: ', rows[0].Title);
			// return data
			res.end(JSON.stringify(rows));
		});
		
	});

}