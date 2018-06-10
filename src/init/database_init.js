/* IMPORT REQUIRED MODULEs */
/*********************************************/
var mysql = require('mysql');
var connection;


/* INTERFACE METHOD */
/*********************************************/
exports.initialize = function()
{
	connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '0103808083Mo',
		database : 'Bookstore'
	});

	connection.connect();
	return connection;
}
