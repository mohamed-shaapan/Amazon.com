/* IMPORT REQUIRED MODULEs */
/*********************************************/
var server_init = require('./server_init');
var database_init = require('./database_init');


/* INTERFACE METHOD */
/*********************************************/
exports.initialize = function()
{
	var server = server_init.initialize();
	var connection = database_init.initialize();

	return [server, connection];
}