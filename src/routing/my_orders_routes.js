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

	// account window
	server.get('/my_orders', function (req, res) {
		
		var page_path = path.join(__dirname + directory_table["my_orders"]);
		res.sendFile(page_path);

	});

	// refresh huser account info
	server.get('/my_orders/refresh_table', function (req, res) {

		// get data from user SESSION
		/*var sql_query = "SELECT * FROM Customer WHERE Email='tmp@tmp.com' ;";
		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('User: ', rows[0].Title);
			res.end(JSON.stringify(rows));
		});*/

	});

	

}