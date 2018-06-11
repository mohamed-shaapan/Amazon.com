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
	// signup page
	server.get('/signup', function (req, res) {
		var page_path = path.join(__dirname + directory_table["signup"]);
		res.sendFile(page_path);
	});

	/* signin submit form */
	server.post('/signup/submit', urlencodedParser, function (req, res) {
		console.log("arrived here");

		/* parse user input */
		response = {
			user_name:req.body.user_name,
			user_password:req.body.user_password,
			first_name:req.body.first_name,
			last_name:req.body.last_name,
			user_email:req.body.user_email,
			user_phone:req.body.user_phone,
			user_address:req.body.user_address
		};
		console.log(response);

		var page_path = path.join(__dirname + directory_table["home"]);
		res.sendFile(page_path);

	});

}