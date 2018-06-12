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

		var user_id = 1;
		// prepare SQL query
		var sql_query = "SELECT I.isbn AS isbn, B.title AS title, I.price AS price, C.quantity AS quantity "+
						"FROM (((SELECT * FROM customer_cart WHERE user_id="+user_id+") AS C) "+
							"JOIN (inventory AS I) ON (I.isbn = C.isbn)) "+
							"JOIN (book_info AS B) ON (I.isbn = B.isbn); ";
		
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

		var user_id = 1;
		// prepare sql statement
		var selected_isbn = req.body.book_isbn;
		var sql_query = "DELETE FROM customer_cart "+
						"WHERE (user_id="+user_id+") AND (isbn="+selected_isbn+") ;";

		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			// refresh table
			var sql_query2 = "SELECT I.isbn AS isbn, B.title AS title, I.price AS price, C.quantity AS quantity "+
							"FROM (((SELECT * FROM customer_cart WHERE user_id="+user_id+") AS C) "+
							"JOIN (inventory AS I) ON (I.isbn = C.isbn)) "+
							"JOIN (book_info AS B) ON (I.isbn = B.isbn); ";
		
			database.query(sql_query2, function (err, rows, fields) {
				// handle errors
				if (err) throw err;
				// return data
				res.end(JSON.stringify(rows));
			});

		});

	});


	/* cart checkout */
	server.post('/cart/checkout', urlencodedParser, function (req, res) {

		var user_id = 1;
		
		for (var key in req.body)
		{
			// extract data
			var isbn = key;
			var quantity = req.body[key];

			// update database
			var sql_query = "UPDATE customer_cart "+
							"SET quantity="+quantity+" "+
							"WHERE (isbn="+isbn+") AND (user_id="+user_id+") ;";

			database.query(sql_query, function (err, rows, fields) {
				// handle errors
				if (err) throw err;
			});
		}

		// redirect to checkout page
		var page_path = path.join(__dirname + directory_table["checkout"]);
		res.sendFile(page_path);

	});
	
}