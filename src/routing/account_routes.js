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
	server.get('/account', function (req, res) {
		
		var page_path = path.join(__dirname + directory_table["account"]);
		res.sendFile(page_path);

	});

	// refresh huser account info
	server.get('/account/refresh_info', function (req, res) {

		// get data from user SESSION
		var sql_query = "SELECT * FROM Customer WHERE Email='tmp@tmp.com' ;";
		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('User: ', rows[0].Title);
			res.end(JSON.stringify(rows));
		});

	});

	/* search books */
	server.post('/account/update_info', urlencodedParser, function (req, res) {

		// prepare sql statement
		var user_name = req.body.user_name;
		var user_password = req.body.user_password;
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var user_email = req.body.user_email;
		var user_phone = req.body.user_phone;
		var user_address = req.body.user_address;

		var sql_query = "UPDATE Customer \
							SET Email=\""+user_email+"\" \
							, First_Name=\""+first_name+"\" \
							, Last_Name=\""+last_name+"\" \
							, Address=\""+user_address+"\" \
							, Phone=\""+user_phone+"\" \
							 "+" WHERE Email=\""+user_email+"\";";

		console.log(sql_query);

		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('Book Title: ', rows[0].Title);
			// return data
			//res.end(JSON.stringify(rows));
		});

	});

	

}