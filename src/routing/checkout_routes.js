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


	// refresh cart table
	server.get('/checkout/refresh_info', function (req, res) {

		var user_id = 1;
		// Prepare output in JSON format
		var sql_query = "SELECT first_name, last_name, phone, address "+
						"FROM user_account "+
						"WHERE id="+user_id+" ;";
		
		database.query(sql_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			//console.log('Book Title: ', rows[0].Title);
			// return data
			res.end(JSON.stringify(rows));
		});

	});


	/* remove book */
	server.post('/checkout/submit', urlencodedParser, function (req, res) {

		// extract data
		var card_number = req.body.card_number;
		var expiration_date = req.body.expiration_date;

		// retrieve items in cart
		var user_id = 1;
		// prepare SQL query
		var cart_items_query ="SELECT * "+
							"FROM customer_cart "+
							"WHERE user_id="+user_id+"; ";

		database.query(cart_items_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			// update info
			var i;
			for(i=0; i<rows.length; i++)
			{
				var row = rows[i];

				var isbn = row["isbn"];
				var quantity = row["quantity"];

				// update purchases table
				var insert_query = "INSERT INTO customer_order (user_id, isbn, quantity) "+
								"VALUES ("+user_id+", "+isbn+", "+quantity+") ;";

				database.query(insert_query, function (err, rows, fields) {
					// handle errors
					if (err) throw err;
				});
			}

			// remove item from cart
			var remove_query = "DELETE FROM customer_cart "+
								"WHERE (user_id="+user_id+") ;";
			database.query(remove_query, function (err, rows, fields) {
					// handle errors
					if (err) throw err;
			});

			/* redirect to home page */
			var page_path = path.join(__dirname + directory_table["home"]);
			res.sendFile(page_path);
			
		});

	});
	
}