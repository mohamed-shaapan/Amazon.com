/* IMPORT REQUIRED MODULEs */
/*********************************************/
var signin_routes = require('./signin_routes');

var directory_table = {
	signin : "/../../web-pages/signin.html",
	signup : "/../../web-pages/signup.html",
	home : "/../../web-pages/customer-view/home.html"
}



/* REQUEST-ROUTING TABLE */
/*********************************************/
exports.start_listening = function(server, database)
{
	signin_routes.handle_routes(server, database, directory_table);
}



















