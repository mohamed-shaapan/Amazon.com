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

	// home window
	server.get('/home', function (req, res) {
		
		var page_path = path.join(__dirname + directory_table["home"]);
		res.sendFile(page_path);

	});

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

	/* search books */
	server.post('/home/search', urlencodedParser, function (req, res) {
		console.log("success---------------------------------------------");

		// prepare sql statement
		var term = req.body.search_term;
		var criteria = req.body.search_criteria;

		var sql_query = "SELECT * FROM Book WHERE "+criteria+" LIKE \"%"+term+"%\" ;";

		console.log(sql_query);

		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('Book Title: ', rows[0].Title);
			// return data
			res.end(JSON.stringify(rows));
		});

	});


	/* add to cart */
	server.post('/home/cart', urlencodedParser, function (req, res) {
		console.log("success---------------------------------------------");

		// prepare sql statement
		var user_email = "\"tmp@tmp.com\"";
		var book_isbn = req.body.book_isbn;
		var total_price = "123";

		var sql_query = "INSERT INTO Customer_Cart VALUES ("+user_email+", "+book_isbn+", "+total_price+");";

		console.log(sql_query);

		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('Book Title: ', rows[0].Title);
			var page_path = path.join(__dirname + directory_table["cart"]);
			res.sendFile(page_path);
		});

	});

}