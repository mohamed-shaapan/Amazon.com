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

	// cart window
	server.get('/cart', function (req, res) {
		
		var page_path = path.join(__dirname + directory_table["cart"]);
		res.sendFile(page_path);

	});

	// refresh cart table
	server.get('/cart/refresh_table', function (req, res) {
		// Prepare output in JSON format
		var sql_query = "SELECT B.ISBN, B.Title, B.Price \
						FROM (Customer_Cart AS C) JOIN (Book AS B) ON (C.ISBN=B.ISBN) \
						WHERE Email='tmp@tmp.com' ;";
		
		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('Book Title: ', rows[0].Title);
			// return data
			res.end(JSON.stringify(rows));
		});

	});


	/* remove book */
	server.post('/cart/remove_book', urlencodedParser, function (req, res) {

		// prepare sql statement
		var selected_isbn = req.body.book_isbn;
		console.log("\nsuccess\n", selected_isbn);

		var sql_query = "DELETE FROM Customer_Cart \
						WHERE (Email='tmp@tmp.com') AND (ISBN="+selected_isbn+") ;";

		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
		});

		// refresh table again
		var sql_query2 = "SELECT B.ISBN, B.Title, B.Price \
						FROM (Customer_Cart AS C) JOIN (Book AS B) ON (C.ISBN=B.ISBN) \
						WHERE Email='tmp@tmp.com' ;";
		
		database.query(sql_query2, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('Book Title: ', rows[0].Title);
			// return data
			res.end(JSON.stringify(rows));
		});

	});


	/* cart checkout */
	server.post('/cart/checkout', urlencodedParser, function (req, res) {

		for (var key in req.body)
		{
			// extract data
			var isbn = key;
			var quantity = req.body[key];

			// update database
			/*var sql_query = "UPDATE Customer_Cart \
						SET (Quantity="+quantity+") \
						WHERE (ISBN="+isbn+") AND (Email='tmp@tmp.com') ;";

			database.query(sql_query, function (err, rows, fields) {
				// handle errors
				if (err) throw err;
			});*/
		}

		// redirect to checkout page
		var page_path = path.join(__dirname + directory_table["checkout"]);
		res.sendFile(page_path);

	});
	
}