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
		console.log("arrived here");

		/* parse user input */
		response = {
			user_email:req.body.user_email,
			user_password:req.body.user_password
		};
		console.log(response);

		var page_path = path.join(__dirname + directory_table["home"]);
		res.sendFile(page_path);

	});

}