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
	// index page
	server.get('/', function (req, res) {
		var page_path = path.join(__dirname + directory_table["signin"]);
		res.sendFile(page_path);
	});

	/* signin submit form */
	server.post('/signin/submit', urlencodedParser, function (req, res) {
		/* extract data */
		var user_email = req.body.user_email;
		var user_password = req.body.user_password;

		/* check database */
		var sql_query = "SELECT login_password, user_name, credentials "+
						"FROM user_account "+
						"WHERE email=\""+user_email+"\" ;";

		database.query(sql_query, function (err, rows, fields) {

			// incorrect email (no result found)
			if (err || rows == undefined || rows.length == 0)
			{
				console.log("\nincorrect email");
				var page_path = path.join(__dirname + directory_table["signin"]);
				res.sendFile(page_path);
				return;
			}

			// check if password is correcr
			var retrieved_password = rows[0]["login_password"];
			var retrieved_user_name = rows[0]["user_name"];
			var retrieved_credentials = rows[0]["credentials"];
			if(retrieved_password != user_password)
			{
				// incorrect password
				console.log("\nincorrect password");
				var page_path = path.join(__dirname + directory_table["signin"]);
				res.sendFile(page_path);
				return;
			}
			
			// correct data
			console.log("\nvalid data");
			var page_path = path.join(__dirname + directory_table["home"]);
			res.sendFile(page_path);
			
		});

		

	});

}