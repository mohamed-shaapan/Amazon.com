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
	server.post('/checkout/submit', urlencodedParser, function (req, res) {

		// extract data
		var card_number = req.body.card_number;
		var expiration_date = req.body.expiration_date;

		// retrieve items in cart
		var cart_items_query = "SELECT B.ISBN, B.Title, B.Price \
								FROM (Customer_Cart AS C) JOIN (Book AS B) ON (C.ISBN=B.ISBN) \
								WHERE Email='tmp@tmp.com' ;";

		database.query(cart_items_query, function (err, rows, fields) {
			// handle errors
			if (err) throw err;
			// update info
			console.log("\n--------------------------------------------------\n");
			var i;
			for(i=0; i<rows.length; i++)
			{
				var row = rows[i];
				var isbn = row["ISBN"];
				var user_email = "tmp@tmp.com";
				var date = "6-12-2018 02-58";

				// update purchases table
				var insert_query = "INSERT INTO Customer_Purchases \
								VALUES (Email='tmp@tmp.com') AND (ISBN=) ;";

				/*database.query(sql_query, function (err, rows, fields) {
					// handle errors
					if (err) throw err;
				});*/
			}

			/* redirect to home page */
			var page_path = path.join(__dirname + directory_table["home"]);
			res.sendFile(page_path);
			
		});

	});
	
}